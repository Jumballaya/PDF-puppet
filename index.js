#!/usr/bin/env node

const program = require('commander');
const generatePDF = require('./src/generatePDF');

/**
 * Program Entry
 */
const entry = argv => {
  program
    .version('0.1.1', '-v, --version')
    .usage('<config> <output>')
    .option(
      '-c, --config <file>',
      'Path to the config yaml file, defaults to ./puppet.yml'
    )
    .option(
      '-o, --out <file>',
      'Path to the output pdf file, defaults to output.pdf'
    )
    .parse(argv);

  if (!program.config) program.config = './puppet.yml';
  if (!program.out) program.out = 'output.pdf';
  const { config, out } = program;
  generatePDF(config, out);
};

entry(process.argv);
