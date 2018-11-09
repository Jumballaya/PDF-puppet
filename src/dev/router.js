/**
 * Dev Server Routes
 */
const generateMarkup = require('../markup');
const refreshScript = require('./browser-refresh');
const { devHost, devPort } = require('../util');

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
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'plain/text' });
        res.write(err);
        res.end();
      });
  },
});

module.exports = router;
