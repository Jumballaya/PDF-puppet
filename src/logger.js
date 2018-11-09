/**
 * Logger
 */

const generateMessage = msg => (items = []) =>
  msg
    .split('%%')
    .map((str, i) => str + (items[i] ? items[i] : ''))
    .join('');

const logger = {
  out: console.log,
  generate: generateMessage,
};

module.exports = logger;
