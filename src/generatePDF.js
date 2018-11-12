/**
 * PDF Maker
 */
const puppeteer = require('puppeteer');
const generateMarkup = require('./markup');
const logger = require('./logger');

/**
 * Generate PDF
 *
 * Generates the PDF from the information in the yaml config
 */
module.exports = async (opts, out) => {
  if (opts === null) {
    logger.out('YAML file could not be read');
    return null;
  }

  logger.out('Generating markup...');
  const markup = await generateMarkup(opts);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => req.continue());
  await page.goto(`data:text/html, ${markup}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  logger.out('Generating PDF...\n');
  const data = await page.pdf({
    path: out,
    format: opts.format || 'A4',
    printBackground: true,
  });

  await browser.close();

  if (!out) {
    return data;
  }
  return null;
};
