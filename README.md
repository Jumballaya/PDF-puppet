# PDF Puppet

PDF Puppet is a tool for creating pdfs using HTML and CSS along with a variety of templating and styles engines.

Install:

`npm install --global pdf-puppet`

Usage:

`-c, --config` -- Specify config yaml file (required)

`-o, --output` -- Specify output pdf file (required)


Example:

`pdf-puppet -c ./demo/invoice.yml -o invoice.pdf`

This will build the PDF using the files and data in the invoice.yml file and output it in the invoice.pdf file.

## Templating engines

The following are supported:

  - Handlebars
  - HTML (plain, no data)
  - Mustache
  - Pug
  - Twig
