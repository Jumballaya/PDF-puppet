#!/usr/bin/env node

const program = require('commander');
const generatePDF = require('./src/generatePDF');

/**
 * Program Entry
 */
const entry = argv => {
  let isDev = false;
  program
    .version('0.1.1', '-v, --version')
    .usage('<config> <output>')
    .option(
      '-c, --config <file>',
      'Path to the config yaml file, defaults to ./puppet.yml',
      'puppet.yml'
    )
    .option(
      '-o, --out <file>',
      'Path to the output pdf file, defaults to ./output.pdf',
      'output.pdf'
    );

  program
    .command('dev')
    .description(
      'run a development server to render the markup before generating the pdf'
    )
    .action(() => {
      isDev = true;
      console.log('Starting dev server...');
      console.log(program.config, program.out);
    });

  program.parse(argv);

  if (!isDev) {
    const { config, out } = program;
    generatePDF(config, out);
  }
};

entry(process.argv);
