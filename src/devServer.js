/**
 * Dev Server
 */
const http = require('http');

const generateMarkup = require('./markup');
const parseOpts = require('./options');
const logger = require('./logger');

// Defaults
const DEFAULT_PORT = 8080;
const DEFAULT_HOST = 'localhost';

// Request Handler
const handleRequest = yml => (req, res) => {
  generateMarkup(yml)
    .then(markup => {
      res.writeHead(200, { 'Content-Type': 'text/html' });

      // TODO: Inject javascript that opens a socket and listens for changes
      res.write(markup);
      res.end();
    })
    .catch(err => {
      res.writeHead(500, { 'Content-Type': 'plain/text' });
      res.write(err);
      res.end();
    });
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

  // TODO: Listen for the frontend to open a socket
  //       Check for file changes and report back to the frontend when the template
  //       or style files change. The frontend will reload the page

  server.listen(port, host, () => logger.out(listenMsg([host, port])));
};

module.exports = runDevServer;
