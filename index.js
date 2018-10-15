#!/usr/bin/env node

const program = require('commander');
const generatePDF = require('./src/generatePDF');

/**
 * Program Entry
 */
const entry = argv => {
  program
    .version('0.0.1', '-v, --version')
    .usage('<config> <output>')
    .option('-c, --config <file>', 'Path to the config yaml file')
    .option('-o, --out <file>', 'Path to the output pdf file')
    .parse(argv);

  if (program.config && program.out) {
    const { config, out } = program;
    generatePDF(config, out);
  } else {
    console.log('Config and/or output not provided');
  }
};

entry(process.argv);
