var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { ctx: global.siteDB});
});

router.get('/sharedfunds', function(req, res, next) {
  res.render('sharedfunds', { ctx: global.siteDB});
});

module.exports = router;
