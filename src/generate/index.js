/**
 * Generate Static Files
 */
const generateHTML = require('./html');
const generatePDF = require('./pdf');
const logger = require('../logger');

module.exports = (cfg, out) => {
  if (cfg === null) {
    logger.out('config file could not be read');
    return null;
  }
  switch (cfg.outputType) {
    // HTML
    case 'html':
      return generateHTML(cfg, out);

    // Default PDF
    default:
      return generatePDF(cfg, out);
  }
};
