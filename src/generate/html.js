/**
 * HTML Maker
 */
const generateMarkup = require('./markup');
const logger = require('../logger');
const { writeFile } = require('../util');

/**
 * Generate PDF
 *
 * Generates the PDF from the information in the yaml config
 */
module.exports = async (cfg, out) => {
  logger.out('Generating markup...');
  const markup = await generateMarkup(cfg);

  logger.out('Generating File...\n');

  if (!out) {
    return markup;
  }

  writeFile(out, markup.full);
  return null;
};
