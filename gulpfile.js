var path = require('path');
var combiner = require('stream-combiner2');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
//var server = require('gulp-express');
var gls = require('gulp-live-server');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');
var replace = require('gulp-replace');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var siteDB = require('./datasource/data.json');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('less:dev', function() {
    var autoprefix = new LessPluginAutoPrefix({
      browsers: ["last 2 versions"]
    });

  return gulp.src('public/less/style.less')
  	//.pipe(sourcemaps.init())
    .pipe(less({
      plugins: [autoprefix]
    }).on('error', function(err) {
      gutil.log(err);
      this.emit('end');
    }))
    //.pipe(sourcemaps.write('.', {includeContent: false, mapSources: 'public/less/**'}))
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('less:prod', function() {
  var cleancss = new LessPluginCleanCSS({
      advanced: true
    }),
    autoprefix = new LessPluginAutoPrefix({
      browsers: ["last 30 versions", "IE 8", "IE 9"]
    });

  return gulp.src('public/less/style.less')
    //.pipe(sourcemaps.init())
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }).on('error', function(err) {
      gutil.log(err);
      this.emit('end');
    }))
    //.pipe(sourcemaps.write('.', {includeContent: false, mapSources: 'public/less/**'}))
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('compress', function() {
  return gulp.src(['public/javascripts/dist/*.js', 'public/javascripts/app.js'])
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('sprites', function() {

  var spriteData = gulp.src('public/__icons/*.png').pipe(spritesmith({
    imgName: 'iconset.png',
    cssName: 'c-icon.less',
    padding: 10,
    cssTemplate: 'icons.hbs'
  }));

  var imgStream = spriteData.img
    .pipe(gulp.dest('public/images/'));
  var cssStream = spriteData.css
    .pipe(gulp.dest('public/less/components/'));

  return merge(imgStream, cssStream);
});


gulp.task('default', function() {
    //1. run your script as a server 
    var server = gls.new('bin/www');
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop) 
    gulp.watch(['views/blocks/*.html', 'views/*.html', './datasource/data.json', './app.js', 'routes/**/*.js'], function() {
     server.notify.apply(server, [file]);
    });

//    gulp.watch('bin/www', ); //restart my server 

    gulp.watch(['public/less/*.less', 'public/less/**/*.less'], ['less:dev']);
    gulp.watch(['public/__icons/*.png'], ['sprites']);
    
   
});

gulp.task('default2', function() {
 
  server.start(['bin/www'], [], [true]);

  gulp.watch(['views/**/*.html', 'views/*.html', './datasource/sdata.json', './app.js', 'routes/**/*.js'], function(event) {
    server.notify(event);
    console.log(path.basename(event.path), 'was', event.type);
    server.stop();
    server.run(['bin/www'])
  });
  gulp.watch(['public/__icons/*.png'], ['sprites', server.notify]);
  gulp.watch(['public/less/*.less', 'public/less/**/*.less'], ['less:dev', server.notify]);
});


gulp.task('export', function() {
  var images, scripts, styles;
  
  nunjucksRender.nunjucks.configure(['views/'], {
    watch: false
  });
  
  images = new RegExp('src=+([\'\"])\/images\/(.[^\'\"]+)', 'g');
  scripts = new RegExp('src=+([\'\"])\/javascripts\/(.[^\'\"]+)', 'g');
  styles = new RegExp('src=+([\'\"])\/stylesheets\/(.[^\'\"]+)', 'g');

  gulp.src(['views/*.html', '!views/__*.html'])
    .pipe(nunjucksRender({
      isExport: true,
      ctx: siteDB
    }))
    .pipe(prettify({
      indent_char: ' ',
      indent_size: 2
    }))
    .pipe(replace(images, 'src=$1@File("/files/images/$2")'))
    .pipe(replace(scripts, 'src=$1@File("/files/js/$2")'))
    .pipe(replace(styles, 'src=$1@File("/files/css/$2")'))
    .pipe(gulp.dest('export'));
});


gulp.task('publish', ['compress', 'less:prod']);