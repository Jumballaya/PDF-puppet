/**
 * Dev Server
 */
const http = require('http');

const router = require('./router');
const setupSocket = require('./socket');

const parseOpts = require('../options');
const logger = require('../logger');

// Defaults
const DEFAULT_PORT = 8080;
const DEFAULT_HOST = 'localhost';

// Request Handler
const handleRequest = yml => (req, res) => {
  const { url } = req;
  const routes = router(yml);

  switch (url) {
    default:
      routes.home(req, res);
  }
};

// Get the port from the config
const devPort = cfg => {
  if (cfg.dev) {
    return cfg.dev.port ? cfg.dev.port : DEFAULT_PORT;
  }
  return DEFAULT_PORT;
};

// Get the host from the config
const devHost = cfg => {
  if (cfg.dev) {
    return cfg.dev.host ? cfg.dev.host : DEFAULT_HOST;
  }
  return DEFAULT_HOST;
};

// Default exported function
// Runs the dev server
const runDevServer = async ymlCfg => {
  const yml = await parseOpts(ymlCfg);
  const port = devPort(yml);
  const host = devHost(yml);

  const server = http.createServer(handleRequest(yml));
  const listenMsg = logger.generate('Listening on host: %% and port: %%');

  setupSocket(server, yml);
  server.listen(port, host, () => logger.out(listenMsg([host, port])));
};

module.exports = runDevServer;
