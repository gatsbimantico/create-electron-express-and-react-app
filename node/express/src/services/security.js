const vendor = require('../utils/vendor.js');
const uuid = vendor('uuid');

const [errorStates, ERROR] = require('../utils/define-enum.js')({
  IS_CANDIDATE: { status: 403, msg: 'Your need to login to access this path' },
  UNAUTHORISED: { status: 403, msg: 'Your authorization is not valid' },
});

// Initial State
const state = {
  nodes: {},
  candidates: {},
};

class SecurityService {
  constructor() {
    this.gde = `gde-${uuid()}`;
    this.errorStates = errorStates;
  }

  getReqIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  }

  setNewId(req, res, nodes) {
    const oldNodeId = req.cookies[this.gde];
    const nodeIp = this.getReqIp(req);

    let nodeId;
    do { nodeId = `sut-${uuid()}`; } while(nodes[nodeId]);

    if (oldNodeId && nodes[oldNodeId]) {
      nodes[nodeId] = { ...nodes[oldNodeId], id: nodeId };
      delete nodes[oldNodeId];
    } else {
      nodes[nodeId] = { id: nodeId, ip: nodeIp };
    }

    res.cookie(this.gde, nodeId, { httpOnly: true, secure: true });

    return nodeId;
  }

  middleware(catchServiceErrors = (a,b,c) => c(), publicPaths = []) {
    return catchServiceErrors((req, res, next) => {
      const oldNodeId = req.cookies[this.gde];
      const isCandidate = state.candidates[oldNodeId];
      const isPublicPath = publicPaths.includes(req.url.replace(/(.)\/$/,'$1'));

      if (oldNodeId && !isCandidate) {
        req.netNodes = {
          reqId: this.setNewId(req, res, state.nodes),
          isPublicPath,
          get nodes() { return state.nodes; },
          get candidates() { return state.candidates; },
          get currentNode() { return state.nodes[req.netNodes.reqId]; }
        };
      } else {
        req.netNodes = {
          reqId: this.setNewId(req, res, state.candidates),
          isCandidate: true,
          isPublicPath,
          get nodes() { return state.nodes; },
          get candidates() { return state.candidates; },
          get currentNode() { return state.candidates[req.netNodes.reqId]; }
        };
      }

      if (!req.netNodes.isPublicPath) {
        if (req.netNodes.isCandidate) {
          throw new Error(ERROR.IS_CANDIDATE);
        } else if (req.netNodes.currentNode.auth !== true) {
          throw new Error(ERROR.UNAUTHORISED);
        }
      }

      next();
    }, errorStates);
  }
}

module.exports = new SecurityService();
