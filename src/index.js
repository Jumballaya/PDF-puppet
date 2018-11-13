/**
 * Documentor
 *
 */

const logger = require('./logger');
const devServer = require('./dev');
const generate = require('./generate');
const parseOpts = require('./options');

module.exports = class Documentor {
  constructor() {
    this.isDev = false;
    this.configPath = '';
    this.cfg = {};
    this.outFile = '';
  }

  // Set config path and parse the options
  setConfig(configPath) {
    this.configPath = configPath;
    this.cfg = parseOpts(configPath);
    if (!this.cfg) throw new Error('issue parsing config file at ', configPath);
  }

  // Sets the output file path
  setOutput(outFile) {
    this.outFile = outFile;
  }

  // Run runs the program
  run() {
    if (this.isDev) {
      this.runDevServer();
      return;
    }
    this.generate();
  }

  // Run Dev Server runs the dev server
  runDevServer() {
    devServer(this.cfg).catch(logger.out);
  }

  // Generate generates the final files
  generate() {
    generate(this.cfg, this.outFile).catch(logger.out);
  }
};
