/**
 * Utils
 */
const fs = require('fs');

// Defaults
const DEFAULT_PORT = 8080;
const DEFAULT_HOST = 'localhost';

/**
 * Read File
 *
 * Promisified fs.readFile
 */
exports.readFile = file =>
  new Promise((resolve, reject) =>
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString());
    })
  );

// Get the port from the config
exports.devPort = cfg => {
  if (cfg.dev) {
    return cfg.dev.port ? cfg.dev.port : DEFAULT_PORT;
  }
  return DEFAULT_PORT;
};

// Get the host from the config
exports.devHost = cfg => {
  if (cfg.dev) {
    return cfg.dev.host ? cfg.dev.host : DEFAULT_HOST;
  }
  return DEFAULT_HOST;
};

// Get the dev.open field from the config
exports.devOpen = cfg => {
  if (cfg.dev) {
    return cfg.dev.open ? true : false;
  }
  return false;
};
