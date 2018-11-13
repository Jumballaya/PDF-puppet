/**
 * Markup Generation
 *
 */
const pug = require('pug');
const Twig = require('twig');
const Mustache = require('mustache');
const Handlebars = require('handlebars');
const sass = require('node-sass');

const { readFile } = require('../util');

/**
 * Select Markup Engine
 *
 */
const selectMarkupEngine = opts => {
  // Get the markup engine from the options
  const engine = opts.markupEngine ? opts.markupEngine.toLowerCase() : null;

  // Select correct template engine
  switch (engine) {
    // Twig
    case 'twig':
      return async (template, data) =>
        readFile(template).then(file => {
          const tpl = Twig.twig({ data: file });
          const markup = tpl.render(data);
          return markup;
        });

    // Pug
    case 'pug':
      return async (template, data) =>
        pug.renderFile(template, {
          doctype: 'html',
          ...data,
        });

    // Mustache
    case 'mustache':
      return async (template, data) =>
        Mustache.render(await readFile(template), data);

    // Handlebars
    case 'handlebars':
      return async (template, data) =>
        Handlebars.compile(await readFile(template))(data);

    // Default, just read the file and return contents
    default:
      return async template => readFile(template);
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
  return {
    styles,
    markup,
    full: `${styles}${markup}`,
  };
};
