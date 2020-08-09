const vendor = require('../utils/vendor.js');
const QR = vendor('qr-tool');
const F2A = vendor('f2a-tool');
const DB = require('../data/db.js');

const MSG = (res) => ({
  LOGIN_SUCCESS: () => res.status(200).send({
    status: 200,
    msg: 'Login successful',
  }),
  SETUP_F2A: (imgSrc) => res.status(201).send({
    status: 201,
    msg: 'User approved, use the following QR to setup your F2A',
    imgSrc,
  }),
  CONTACT_FOR_APPROVAL: () => res.status(202).send({
    status: 202,
    msg: 'Contact the network admin to approve this login',
  }),
  LOGIN_FAILURE: () => res.status(403).send({
    status: 403,
    msg: 'Login failed',
  }),
  LOGOUT_SUCCESS: () => res.status(200).send({
    status: 200,
    msg: 'Logout successful',
  }),
});

function User(username) {
  const dbUsers = DB.get(DB.USER);

  return {
    current: dbUsers.friends[username],
    save: () => DB.set(DB.USER, dbUsers),
    saveAsCandidate: (node) => {
      dbUsers.candidates[username] = {
        username,
        log: { [node.ip]: new Date().toISOString() }
      };

      DB.set(DB.USER, dbUsers);
    },
  }
}

async function logIn(req, res) {
  const auth = (req.header('Authorization') || '').replace(/^Basic /, '');
  const [username, f2aToken] = Buffer.from(auth, "base64").toString("utf8").split(':');
  const user = User(username);

  if (user.current) {
    const {
      reqId,
      isCandidate = false,
      nodes,
      candidates,
      currentNode,
    } = req.netNodes;

    nodes[reqId] = currentNode;
    if (isCandidate) delete candidates[reqId];

    if (!user.current.F2A) {
      const {
        'F2A.name': f2aName,
      } = DB.get(DB.CONF);
      
      const { secret, otpUrl } = F2A.generateSecret({ name: f2aName });
      user.current.F2A = secret;
      user.save();
      MSG(res).SETUP_F2A(await QR.generateDataUrl(otpUrl));
    } else {
      const isCodeValid = await F2A.validateToken(
        user.current.F2A,
        f2aToken,
      );
      nodes[reqId].auth = isCodeValid;

      if (isCodeValid) {
        user.current.log[currentNode.ip] = new Date().toISOString();
        user.save();
        MSG(res).LOGIN_SUCCESS();
      } else {
        MSG(res).LOGIN_FAILURE();
      }
    }
  } else {
    user.saveAsCandidate(req.netNodes.currentNode);
    MSG(res).CONTACT_FOR_APPROVAL();
  }
}

function logOut(req, res) {
  const {
    currentNode,
  } = req.netNodes;

  delete currentNode.auth;
  MSG(res).LOGOUT_SUCCESS();
}

const PATHS = {
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
};

module.exports.PATHS = PATHS;

module.exports.configurator = function UserLogger(app) {
  app.get(PATHS.LOGIN, logIn);
  app.get(PATHS.LOGOUT, logOut);
};

module.exports.publicPaths = [
  PATHS.LOGIN,
];

module.exports.permitPaths = [
];
