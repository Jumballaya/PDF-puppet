/**
 * Dev Server Routes
 */
const generateMarkup = require('../markup');
const generatePDF = require('../generatePDF');
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
    generatePDF(cfg)
      .then(pdf => {
        res.writeHead(200, { 'Content-Type': 'application/pdf' });
        res.write(pdf);
        res.end();
      })
      .catch(errorRoute(req, res));
  },
});

module.exports = router;
