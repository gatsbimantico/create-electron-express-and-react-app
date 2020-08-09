function ExpressApp(configOverride = {}, hooks = {}) {
  const ExpressServer = require('./src/server.js');
  const DB = require('./src/data/db.js');

  const config = DB.put(DB.CONF, configOverride);

  if (hooks.preInstance) hooks.preInstance(config, DB);
  const server = new ExpressServer();
  if (hooks.preBoot) hooks.preBoot(config, DB, server);
  server.boot(config);
  if (hooks.preConfigure) hooks.preConfigure(config, DB, server);
  server.configure(config);
  if (hooks.preStart) hooks.preStart(config, DB, server);
  server.start(config);
  if (hooks.postStart) hooks.postStart(config, DB, server);
}

module.exports.App = ExpressApp;
module.exports.vendor = require('./src/utils/vendor.js');
