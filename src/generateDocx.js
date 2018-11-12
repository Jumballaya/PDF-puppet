/**
 * Generate Docx
 *
 * Generate Word docx format files
 */
const path = require('path');
const unoconv = require('unoconv');
const generateMarkup = require('./markup');
const logger = require('./logger');
const { writeFile } = require('./util');

const convert = (file, type) =>
  new Promise((resolve, reject) => {
    unoconv.convert(file, type, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

module.exports = async (cfg, out) => {
  logger.out('Generating markup...');
  //const markup = await generateMarkup(cfg);
  const docx = await convert(path.resolve('./test.pdf'), 'docx');

  if (!out) return docx;

  await writeFile(out, docx);
  return null;
};
