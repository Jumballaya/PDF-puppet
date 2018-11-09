# PDF Puppet

PDF Puppet is a tool for creating pdfs using HTML and CSS along with a variety of templating and styles engines.

Install:

`npm install --global pdf-puppet`

Usage:

```
Usage: pdf-puppet <config> <output>

Options:
  -v, --version        output the version number
  -c, --config <file>  Path to the config yaml file. (default: "puppet")
  -o, --out <file>     Path to the output pdf file. (default: "output.pdf")
  -h, --help           output usage information

Commands:
  dev                  run a development server to render the markup before generating the pdf
```

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

## Style engines

The following are supported:

  - CSS
  - SCSS

## Config file

You can find sample config files in the demo folder. Here is a breakdown of the different parts --

  - `title`: Title of document, it will appear in the title section during development
  - `template`: Path to the template file
  - `styles`: Path to the style file
  - `markupEngine`: Markup/Template engine to be used (pug, twig, etc.)
  - `dev`: Development settings object
    * `port`: Port for the dev server
    * `host`: Host for the dev server
    * `open`: Opens the browser automatically if set to true
  - `data`: Data object to be passed to the template

