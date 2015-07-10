'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var paths = gulp.paths;

gulp.task('watch', ['templateCache', 'images_tmp', 'partials_tmp', 'misc_tmp'], function () {
  gulp.watch([
    paths.src + '/**/*.html',
    paths.src + '/frontend/**/*.scss',
    paths.src + '/frontend/**/*.js',
    paths.src + '/frontend/**/*.coffee',
    'bower.json'
  ], ['templateCache', 'partials_tmp']);
});


gulp.task('watch-scripts', ['templateCache'], function () {
  gulp.watch([
    paths.src + '/frontend/**/*.js',
    paths.src + '/frontend/**/*.coffee'
  ], ['templateCache']);
});


gulp.task('watch-backend',['scripts'], function () {
  gulp.watch([
    paths.src + '/backend/**/*.coffee'
  ], ['testBE']);
});