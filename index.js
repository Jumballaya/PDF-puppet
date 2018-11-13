#!/usr/bin/env node

const program = require('commander');
const Documentor = require('./src');

// Descriptions
const DEV_DESC =
  'run a development server to render the markup before generating the pdf';
const APP_DESC = 'Generate beautiful documents with modern web tools';

/**
 * Initialize CLI
 */
const init = () => {
  const documentor = new Documentor();

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
      documentor.isDev = true;
    });

  return documentor;
};

/**
 * Program Entry
 */
const entry = argv => {
  const documentor = init();
  program.parse(argv);

  const { config, out } = program;
  documentor.setConfig(config);

  if (!documentor.isDev) {
    const { cfg } = documentor;
    const outFile = `${out}.${cfg.outputType ? cfg.outputType : 'pdf'}`;
    documentor.setOutput(outFile);
  }

  documentor.run();
};

entry(process.argv);
