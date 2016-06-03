var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var pages = fs.readdirSync('./views/');
/* GET home page. */
function getPages () {
	global.PAGELIST = []
	var d = fs.readdirSync('./views/');
	var pages = [];
	d.forEach((name, b) => {
		if (name.split('.').length > 1) {
			var url = name.split('.')[0]
			if (name != 'error.html' && name != 'layout.html') {
				pages.push({name, url})
			}
		}
	});
	global.PAGELIST = pages
} 
getPages ();

router.get('/', function(req, res, next) {
  res.render('index', { ctx: global.siteDB, PAGES: global.PAGELIST});
});

router.get('/index', function(req, res, next) {
  res.render('index', { ctx: global.siteDB});
});

router.get('/sharedfunds', function(req, res, next) {
  res.render('sharedfunds', { ctx: global.siteDB});
});

router.get('/opf', function(req, res, next) {
  res.render('opf', { ctx: global.siteDB});
});

router.get('/trustmanagement', function(req, res, next) {
  res.render('trustmanagement', { ctx: global.siteDB});
});

router.get('/news', function(req, res, next) {
  res.render('news', { ctx: global.siteDB});
});

router.get('/team', function(req, res, next) {
  res.render('team', { ctx: global.siteDB});
});

router.get('/about', function(req, res, next) {
  res.render('about', { ctx: global.siteDB});
});

router.get('/points', function(req, res, next) {
  res.render('points', { ctx: global.siteDB});
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts', { ctx: global.siteDB});
});

router.get('/license', function(req, res, next) {
  res.render('license', { ctx: global.siteDB});
});

router.get('/sirius', function(req, res, next) {
  res.render('sirius', { ctx: global.siteDB});
});


router.get('/pages', function(req, res, next) {
  res.render('__page_list', { ctx: global.siteDB, PAGES: global.PAGELIST });
});

module.exports = router;
