/**
 * PDF Maker
 */
const puppeteer = require('puppeteer');
const generateMarkup = require('./markup');
const logger = require('../logger');

/**
 * Generate PDF
 *
 * Generates the PDF from the information in the yaml config
 */
module.exports = async (cfg, out) => {
  logger.out('Generating markup...');
  const markup = await generateMarkup(cfg);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => req.continue());
  await page.goto(`data:text/html, ${markup.full}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  const bodyHandle = await page.$('body');
  const { width, height } = await bodyHandle.boundingBox();

  logger.out('Generating PDF...\n');
  const data = await page.pdf({
    path: out,
    format: cfg.format ? cfg.format : null,
    width: cfg.width ? cfg.width : width + 15,
    height: cfg.height ? cfg.height : height + 50,
    printBackground: true,
  });

  await browser.close();

  if (!out) {
    return data;
  }
  return null;
};
