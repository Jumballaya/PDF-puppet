/**
 * PDF Maker
 */
const puppeteer = require('puppeteer');
const generateMarkup = require('./markup');
const parseOpts = require('./options');

/**
 * Generate PDF
 *
 * Generates the PDF from the information in the yaml config
 */
module.exports = async (configFile, out) => {
  const opts = parseOpts(configFile);
  if (opts === null) {
    console.log('YAML file could not be read');
    return;
  }

  console.log('Generating markup...');
  const markup = await generateMarkup(opts);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`data:text/html, ${markup}`);

  console.log('Generating PDF...\n');
  await page.pdf({
    path: out,
    format: configFile.format || 'A4',
    printBackground: true,
  });

  await browser.close();
};
