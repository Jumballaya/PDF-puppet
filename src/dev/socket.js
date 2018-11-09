/**
 * Web Socket Server
 */
const WebSocket = require('ws');
const logger = require('../logger');
const fs = require('fs');

// File Watcher
const fileWatcher = (cfg, action) => {
  const onChange = file => () => {
    action(file);
  };

  fs.watchFile(cfg.template, onChange(cfg.template));
  fs.watchFile(cfg.styles, onChange(cfg.styles));
};

// Create new server
const newServer = (extServer, cfg) => {
  const wss = new WebSocket.Server({ server: extServer });

  wss.on('connection', ws => {
    ws.on('message', msg => {
      logger.out('received: ', msg);
    });
    ws.send('Connected to server');
  });

  fileWatcher(cfg, file => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`File changed: ${file}... reloading...`);
        client.send('RELOAD');
      }
    });
  });
};

module.exports = newServer;
