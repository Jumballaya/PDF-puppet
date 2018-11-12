/**
 * Generate Static Files
 */
const generateDocx = require('./generateDocx');
const generatePDF = require('./generatePDF');

module.exports = (cfg, out) => {
  switch (cfg.outputType) {
    // DOCX
    case 'docx' || 'doc':
      return generateDocx(cfg, out);

    // Default PDF
    default:
      return generatePDF(cfg, out);
  }
};
