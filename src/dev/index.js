/**
 * Dev Server
 */
const http = require('http');
const opn = require('opn');

const router = require('./router');
const setupSocket = require('./socket');

const parseOpts = require('../options');
const logger = require('../logger');
const { devHost, devPort, devOpen } = require('../util');

// Request Handler
const handleRequest = cfg => (req, res) => {
  const { url } = req;
  const routes = router(cfg);

  switch (url) {
    default:
      routes.home(req, res);
  }
};

// Default exported function
// Runs the dev server
const runDevServer = async configFile => {
  const cfg = await parseOpts(configFile);
  if (cfg === null) throw new Error('Error with config file, wrong file type.');

  const port = devPort(cfg);
  const host = devHost(cfg);

  const server = http.createServer(handleRequest(cfg));
  const listenMsg = logger.generate('Listening on host: %% and port: %%');

  // Creates the ws server using the http server object
  setupSocket(server, cfg);

  server.listen(port, host, () => {
    logger.out(listenMsg([host, port]));
    if (devOpen(cfg)) opn(`http://${host}:${port}`);
  });
};

module.exports = runDevServer;
