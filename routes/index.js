var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/game', (req, res) => {
  res.render('game');
});

router.get('/purejs', (req, res) => {
  res.render('purejs');
});

module.exports = router;
