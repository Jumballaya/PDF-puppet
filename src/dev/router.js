/**
 * Dev Server Routes
 */
const generateMarkup = require('../markup');
const refreshScript = require('./browser-refresh');

const router = yml => ({
  // Main route
  home: (req, res) => {
    generateMarkup(yml)
      .then(markup => {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        const refresh = refreshScript('localhost', 8080);
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
