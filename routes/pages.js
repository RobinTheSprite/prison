var express = require('express');
var router = express.Router();

router.get('/visitors', (req, res) => {
  res.render('visitors', {title: 'Visitors'});
});

router.get('/prisoners', (req, res) => {
  res.render('prisoners', {title: 'Prisoners'});
});

router.get('/guards', (req, res) => {
  res.render('guards', {title: 'Guards'});
});

router.get('/programs', (req, res) => {
  res.render('programs', {title: 'Programs'});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Underwood State Penitentiary' });
});

module.exports = router;
