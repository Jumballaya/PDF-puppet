/**
 * Dev Server
 */
const http = require('http');
const opn = require('opn');

const router = require('./router');
const setupSocket = require('./socket');

const logger = require('../logger');
const { devHost, devPort, devOpen } = require('../util');

// Request Handler
const handleRequest = cfg => (req, res) => {
  const { url } = req;
  const routes = router(cfg);

  // Generate and serve PDF
  if (url.includes('.pdf')) {
    routes.pdf(req, res);
    return;
  }

  // Default HTML
  routes.home(req, res);
};

// Default exported function
// Runs the dev server
const runDevServer = async cfg => {
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
