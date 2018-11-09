/**
 * Web Socket Server
 */
const WebSocket = require('ws');
const logger = require('../logger');
const fs = require('fs');

// File Watcher
const fileWatcher = (yml, action) => {
  const onChange = file => () => {
    action(file);
  };

  fs.watchFile(yml.template, onChange(yml.template));
  fs.watchFile(yml.styles, onChange(yml.styles));
};

// Create new server
const newServer = (extServer, yml) => {
  const wss = new WebSocket.Server({ server: extServer });

  wss.on('connection', ws => {
    ws.on('message', msg => {
      logger.out('received: ', msg);
    });
    ws.send('Connected to server');
  });

  fileWatcher(yml, file => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`File changed: ${file}... reloading...`);
        client.send('RELOAD');
      }
    });
  });
};

module.exports = newServer;
