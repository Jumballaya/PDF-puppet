/**
 * Utils
 */
const fs = require('fs');

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
