/**
 * Markup Generation
 *
 */
const fs = require('fs');
const pug = require('pug');
const Twig = require('twig');
const Mustache = require('mustache');
const sass = require('node-sass');

/**
 * Select Markup Engine
 *
 */
const selectMarkupEngine = opts => {
  const engine = opts.markupEngine ? opts.markupEngine.toLowerCase() : null;
  const PUG = async (template, data) =>
    pug.renderFile(template, {
      doctype: 'html',
      ...data,
    });
  switch (engine) {
    // Twig
    case 'twig':
      return async (template, data) =>
        new Promise((resolve, reject) => {
          Twig.renderFile(template, data, (err, markup) => {
            if (err) reject(err);
            resolve(markup);
          });
        });

    // Pug
    case 'pug':
      return PUG;

    // Mustache
    case 'mustache':
      return async (template, data) =>
        Mustache.render(fs.readFileSync(template).toString(), data);

    // Default
    default:
      return PUG;
  }
};

/**
 * Generate Markup
 *
 * generates the HTML markup after compiling the Pug template and SCSS stylesheet
 */
module.exports = async opts => {
  const compiledStyles = sass.renderSync({ file: opts.styles });
  const styles = `<style>${compiledStyles.css}</style>`;
  const markupEngine = selectMarkupEngine(opts);
  const markup = await markupEngine(opts.template, opts.data);
  return `${styles}${markup}`;
};
