/**
 * Options
 */
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const logger = require('./logger');

/**
 * Parse Yaml
 *
 * Parses a yaml file and returns the config object
 */
const parseYaml = (fp, silent = false) => {
  try {
    const cfg = yaml.safeLoad(fs.readFileSync(fp, 'utf8'));
    cfg.template = path.resolve(path.dirname(fp), cfg.template);
    cfg.styles = path.resolve(path.dirname(fp), cfg.styles);
    return cfg;
  } catch (e) {
    if (!silent) throw e;
    return null;
  }
};

/**
 * Parse JSON
 *
 * Parses a json file and returns the config object
 */
const parseJson = (fp, silent = false) => {
  try {
    const file = fs.readFileSync(fp, 'utf8');
    const cfg = JSON.parse(file);
    cfg.template = path.resolve(path.dirname(fp), cfg.template);
    cfg.styles = path.resolve(path.dirname(fp), cfg.styles);
    return cfg;
  } catch (e) {
    if (!silent) logger.out(e);
    return null;
  }
};

/**
 * Parse Opts
 *
 * Parse the yaml options file and set the template and styles path. This will return null
 * if the action couldn't be complete.
 */
module.exports = configFile => {
  const fp = path.resolve(configFile);
  const ext = path.extname(fp);

  switch (ext) {
    case '.yml' || '.yaml':
      return parseYaml(fp);
    case '.json':
      return parseJson(fp);
    case '':
      return parseYaml(`${fp}.yml`, true) || parseJson(`${fp}.json`, true);
    default:
      return null;
  }
};
