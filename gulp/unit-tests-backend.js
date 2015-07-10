'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var paths = gulp.paths;



gulp.task('testBE', ['watch-backend'], function () {

  return gulp.src(paths.specs + '/backend/**/*.spec.js')
    .pipe($.jasmine({verbose: true}));
});

gulp.task('testBECodeship', function () {

  return gulp.src(paths.specs + '/backend/**/*.spec.js')
    .pipe($.jasmine({verbose: true}));
});

// function runTestsBE (singleRun, done) {

//   var testFiles = [];
//   testFiles = testFiles.concat([paths.tmp + '/serve/node/**/*.js', paths.src + '/{node}/**/*.spec.js', paths.src + '/{node}/**/*.mock.js']);



//   console.log("running tests");

//   gulp.src(testFiles)
//     .pipe($.karma({
//       configFile: 'karma-backend.conf.js',
//       action: (singleRun)? 'run': 'watch'
//     }))
//     .on('error', function (err) {
//       // Make sure failed tests cause gulp to exit non-zero
//       throw err;
//     });
// }


// gulp.task('testBE', ['scripts'], function (done) { runTestsBE(true /* singleRun */, done) });
// gulp.task('testBE:auto', ['watch-backend'], function (done) { runTestsBE(false /* singleRun */, done) });
