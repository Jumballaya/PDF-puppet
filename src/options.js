/**
 * Options
 */
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Parse Opts
 *
 * Parse the yaml options file and set the template and styles path. This will return null
 * if the action couldn't be complete.
 */
module.exports = configFile => {
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
