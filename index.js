#!/usr/bin/env node

const program = require('commander');
const generate = require('./src/generate');
const devServer = require('./src/dev');
const parseOpts = require('./src/options');
const logger = require('./src/logger');

// Descriptions
const DEV_DESC =
  'run a development server to render the markup before generating the pdf';

const APP_DESC = 'Generate beautiful documents with modern web tools';

// Check Config File
const cfgAllGood = cfg => {
  if (!cfg) {
    return false;
  }
  return true;
};

/**
 * Program Entry
 */
const entry = argv => {
  let isDev = false;
  program
    .version('0.1.1', '-v, --version')
    .description(APP_DESC)
    .usage('<config> <output>')
    .option('-c, --config <file>', 'Path to the config yaml file.', 'puppet')
    .option('-o, --out <file>', 'Path to the output pdf file.', 'output');

  program
    .command('dev')
    .description(DEV_DESC)
    .action(() => {
      isDev = true;
      const { config } = program;
      logger.out('Starting dev server...');
      devServer(parseOpts(config)).catch(logger.out);
    });

  program.parse(argv);

  if (!isDev) {
    const { config, out } = program;
    const cfg = parseOpts(config);
    const outFile = `${out}.${cfg.outputType ? cfg.outputType : 'pdf'}`;
    generate(cfg, outFile).catch(logger.out);
  }
};

entry(process.argv);
