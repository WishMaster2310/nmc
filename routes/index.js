var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: global.siteDB.companyName, ctx: global.siteDB});
});

module.exports = router;
