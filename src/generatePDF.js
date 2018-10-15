/**
 * PDF Maker
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const pug = require('pug');
const sass = require('node-sass');

/**
 * Parse Opts
 *
 * Parse the yaml options file and set the template and styles path. This will return null
 * if the action couldn't be complete.
 */
const parseOpts = configFile => {
  const fp = path.resolve(configFile);
  try {
    const cfg = yaml.safeLoad(fs.readFileSync(fp, 'utf8'));
    cfg.template = path.resolve(path.dirname(fp), cfg.template);
    cfg.styles = path.resolve(path.dirname(fp), cfg.styles);
    return cfg;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Generate Markup
 *
 * generates the HTML markup after compiling the Pug template and SCSS stylesheet
 */
const generateMarkup = async opts => {
  const compiled = sass.renderSync({ file: opts.styles });
  const styles = `<style>${compiled.css}</style>`;

  const markup = pug.renderFile(opts.template, {
    doctype: 'html',
    ...opts.data,
  });

  return `${styles}${markup}`;
};

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
  const markup = await generateMarkup(opts);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`data:text/html, ${markup}`);

  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
};
