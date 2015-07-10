'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  gulp.src([paths.src + '/**/*.spec.coffee', '!' + paths.src + '/backend/*.spec.coffee'])
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter())
    .pipe($.coffee())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe($.rename({dirname: ''}))
    .pipe(gulp.dest(paths.specs + '/frontend/'))
    .pipe($.size())

  gulp.src(paths.src + '/backend/*.spec.coffee')
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter())
    .pipe($.coffee())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe($.rename({dirname: ''}))
    .pipe(gulp.dest(paths.specs + '/backend/'))
    .pipe($.size())

  return gulp.src([paths.src + '/{frontend,backend}/**/*.coffee', paths.src + '/server.coffee', '!' + paths.src + '/**/*.spec.coffee'])
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter())
    .pipe($.coffee())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.tmp + '/serve/'))
    .pipe($.size())
});

