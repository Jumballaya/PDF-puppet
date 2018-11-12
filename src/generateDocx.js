/**
 * Generate Docx
 *
 * Generate Word docx format files
 */
const htmlDocx = require('html-docx-js');
const fs = require('fs');

const generateMarkup = require('./markup');
const logger = require('./logger');

module.exports = async (cfg, out) => {
  logger.out('Generating markup...');
  const markup = await generateMarkup(cfg);
  const docx = htmlDocx.asBlob(Buffer.from(markup));

  console.log(docx);

  if (!out) {
    return docx;
  }

  await fs.writeFile(out, docx, err => {
    if (err) throw err;
    logger.out('Docx file saved to ', out);
  });
  return null;
};
