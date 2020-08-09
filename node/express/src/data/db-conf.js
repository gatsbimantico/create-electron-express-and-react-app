const vendor = require('../utils/vendor.js');
const uuid = vendor('uuid');

module.exports = (DB) => {
  DB.CONF = DB.relPath('./.db.conf.json');
  DB.init[DB.CONF] = {
    'otp.label': `otp-${uuid()}`,
    'otp.algorithm': 'sha256',
    'otp.encoding': 'ascii',
    'server.security.publicPaths': [],
    'server.security.permitPaths': [],
    'server.env.dev.active': false,
    'server.env.dev.endpoint': "http://localhost:3000",
    'server.port': 3001,
  };

  return DB.CONF;
};
