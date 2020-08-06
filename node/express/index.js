function ExpressApp(configOverride = {}) {
  const ExpressServer = require('./src/server.js');
  const DB = require('./src/data/db.js');

  const config = DB.put(DB.CONF, configOverride);

  new ExpressServer()
    .boot(config)
    .configure(config)
    .start(config);
}

module.exports.App = ExpressApp;
module.exports.vendor = require('./src/utils/vendor.js');
