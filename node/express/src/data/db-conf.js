const vendor = require('../utils/vendor.js');
const uuid = vendor('uuid');

module.exports = (DB) => {
  DB.CONF = DB.relPath('./.db.conf.json');
  DB.init[DB.CONF] = {
    'F2A.name': `f2a-${uuid()}`,
    'server.security.publicPaths': [],
    'server.security.permitPaths': [],
    'server.env.dev.active': false,
    'server.env.dev.endpoint': "http://localhost:3000",
    'server.port': 3001,
  };

  return DB.CONF;
};
