'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

var nodemon = require('gulp-nodemon');

var $ = require('gulp-load-plugins')();

function browserSyncInit(files, browser) {
  browser = browser === undefined ? 'default' : browser;
  browserSync.instance = browserSync.init(files, {
    startPath: '/#/',
    browser: browser,
    proxy: "http://localhost:61361/"
  });
}

////////////////////////////////////////////// PURE NODE for unit tests /////////////////////////////////////////////////////

gulp.task('node',['watch'], function(cb){
  return nodemon({
    script: paths.tmp + '/serve/server.js',
    watch: [paths.src + '/backend'],
    ext: 'coffee',
    tasks: ['scripts'],
    env: { 'NODE_ENV': 'development' } ,
    nodeArgs: ['--debug=9999']
  })
  .on('restart' , function onRestart() {
    console.log("################################ restarted gulp-nodemon ################################");
  });
});


////////////////////////////////////////////// SERVE DEVELOPMENT MODE ////////////////////////////////////////

gulp.task('serve',['watch'], function(cb){
  var called = false;
  return nodemon({
    script: paths.tmp + '/serve/server.js',
    watch: [paths.src + '/backend'],
    ext: 'coffee',
    tasks: ['templateCache', 'partials_tmp'],
    env: { 'NODE_ENV': 'development' } ,
    nodeArgs: ['--debug=9999']
  })
  .on('start', function onStart() {
    if (!called) {
      cb();
      browserSyncInit([
        paths.tmp + '/serve/frontend/**/*.css',
        paths.tmp + '/serve/frontend/**/*.js',
        paths.src + 'src/assets/images/**/*',
        paths.tmp + '/serve/*.html',
        paths.tmp + '/serve/frontend/**/*.html',
        paths.src + '/frontend/**/*.html'
      ]);
    }
    called = true;
  })
  .on('restart' , function onRestart() {
    console.log("################################ restarted gulp-nodemon ################################");
    //Also reload the browsers after a slight delay
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
      console.log("reloaded");
    }, 1000);
  });
});

////////////////////////////////////////////// SERVE IN PRODUCTION MODE ////////////////////////////////////////

gulp.task('serve:dist',['build'], function(cb){
  var called = false;
  console.log("starting nodemon");
  return nodemon({
    script: paths.dist + '/server.js',
    env: { 'NODE_ENV': 'production' } ,
    nodeArgs: ['--debug=9999']
  })
  .on('start', function onStart() {
    if (!called) {
      cb();
      browserSyncInit(paths.dist);
    }
    called = true;
  })
});


////////////////////////////////////////////// E2E TEST DEVELOPMENT MODE ////////////////////////////////////////

gulp.task('serve:e2e', ['node:e2e'], function () {
  browserSyncInit([paths.tmp + '/serve', paths.src], null);
});

gulp.task('node:e2e', ['templateCache'], function(){
  return nodemon({
    script: paths.tmp + '/serve/server.js',
    env: { 'NODE_ENV': 'development' } ,
    stdout: false,
    nodeArgs: ['--debug=9999']
  });
});

////////////////////////////////////////////// E2E PRODUCTION DEVELOPMENT MODE ////////////////////////////////////////

gulp.task('serve:e2e-dist', ['node:e2e-dist'], function () {
  browserSyncInit([paths.dist + '/', paths.src], null);
});

gulp.task('node:e2e-dist', ['build'], function(){
  return nodemon({
    script: paths.dist + '/server.js',
    env: { 'NODE_ENV': 'development' } ,
    stdout: false,
    nodeArgs: ['--debug=9999']
  });
});

////////////////////////////////////////////// ANGULAR TEMPLATE CACHE for DEVELOPMENT MODE ////////////////////////////////////////

gulp.task('partials_tmp', function () {
  return gulp.src([
    paths.src + '/frontend/**/*.html',
    paths.tmp + '/frontend/**/*.html'
  ])
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'projectname'
    }))
    .pipe(gulp.dest(paths.tmp + '/partials/'));
});
