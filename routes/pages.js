var express = require('express');
var router = express.Router();

const pages = ['visitors', 'prisoners', 'guards', 'programs', 'incidents'];

pages.forEach(page => {
  router.get('/' + page, (req, res) => {
    res.render(page, {title: page.replace(/^\w/, c => c.toUpperCase())})
  })
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Underwood State Penitentiary' });
});

module.exports = router;
