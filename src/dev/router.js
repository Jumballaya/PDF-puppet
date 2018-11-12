/**
 * Dev Server Routes
 */
const generateMarkup = require('../markup');
const generate = require('../generate');
const refreshScript = require('./browser-refresh');
const { devHost, devPort } = require('../util');

// Error route
const errorRoute = (req, res) => err => {
  res.writeHead(500, { 'Content-Type': 'plain/text' });
  res.write(err.toString());
  res.end();
};

const router = cfg => ({
  // Main route
  home: (req, res) => {
    generateMarkup(cfg)
      .then(markup => {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        const refresh = refreshScript(devHost(cfg), devPort(cfg));
        const out = `${markup}<script>${refresh}</script>`;

        res.write(out);
        res.end();
      })
      .catch(errorRoute(req, res));
  },

  // Pdf route
  // This route generates a pdf of the finished product
  pdf: (req, res) => {
    generate({ ...cfg, outputType: 'pdf' })
      .then(pdf => {
        res.writeHead(200, { 'Content-Type': 'application/pdf' });
        res.write(pdf);
        res.end();
      })
      .catch(errorRoute(req, res));
  },

  // PDF viewer
  // This route is a viewer that embeds the PDF
  viewer: (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const refresh = refreshScript(devHost(cfg), devPort(cfg));

    res.write(`<html>
  <body style="height: 100%; width: 100%; overflow: hidden; margin: 0px; background-color: rgb(82, 86, 89);" cz-shortcut-listen="true">
    <embed width="100%" height="100%" name="plugin" id="plugin" src="/pdf.pdf" type="application/pdf" internalinstanceid="12">
    <script>${refresh}</script>
  </body>
</html>`);

    res.end();
  },
});

module.exports = router;
