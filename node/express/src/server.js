const vendor = require('./utils/vendor.js');
const express = vendor('express');
const http = vendor('http');
const path = vendor('path');
const glob = vendor('glob');
const bodyParser = vendor('body-parser');
const cookieParser = vendor('cookie-parser');

function catchErrors(callback, errors) {
  return (req, res, ...args) => {
    try {
      callback(req, res, ...args);
    } catch(e) {
      const error = errors[e.message];
      if (error) {
        const parsedError = (typeof error === 'function' ? error() : error);
        res.status(parsedError.status).json(parsedError);
      } else {
        res.status(500).json({ status: 500, msg: e.message });
      }
    }
  }
}

function ExpressServer() {
  const app = express();
  const server = http.createServer(app);
  const routes = glob.sync(path.join(__dirname, './server-routes/*.js'))
    .map((file) => require(path.resolve(file)));

  function bootServer({
    'server.env.dev.active': isDevEnv,
    'server.security.publicPaths': publicPaths,
    'server.security.permitPaths': permitPaths,
  }) {
    app.use(bodyParser.json());
    app.use(cookieParser());

    if (!isDevEnv) {
      app.use(express.static(path.join(__dirname, '../../../build')));
    }

    app.use(require('./services/security.js').middleware(
      catchErrors,
      routes.reduce((all, route) => ({
        permitPaths: all.permitPaths.concat(route.permitPaths || []),
        publicPaths: all.publicPaths.concat(route.publicPaths || []),
       }), { permitPaths, publicPaths }),
    ));

    return this;
  }

  function configureServer() {
    const errorStates = {};
    routes.forEach(({ configurator }) => {
        configurator({
          get(route, ...handlers) {
            app.get(route, ...handlers.map(fn => catchErrors(fn, errorStates)));
          },
          post(route, ...handlers) {
            app.post(route, ...handlers.map(fn => catchErrors(fn, errorStates)));
          },
          put(route, ...handlers) {
            app.put(route, ...handlers.map(fn => catchErrors(fn, errorStates)));
          },
          delete(route, ...handlers) {
            app.delete(route, ...handlers.map(fn => catchErrors(fn, errorStates)));
          },
        }, errorStates);
      });

    return this;
  }

  function startServer({
    'server.env.dev.active': isDevEnv,
    'server.env.dev.endpoint': devEnvEndpoint,
    'server.port': port,
  }) {
    if (isDevEnv) {
      app.get('*', function redirectToLocalhost(req, res) {
        res.redirect(`${devEnvEndpoint}${req.originalUrl}`);
      });
    }

    server.listen(port, () => console.log(`listening on localhost:${port}`));

    return this;
  }

  this.boot = bootServer;
  this.configure = configureServer;
  this.start = startServer;
}

module.exports = ExpressServer;
