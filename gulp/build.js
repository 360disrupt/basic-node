'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    paths.src + '/frontend/**/*.html',
    paths.tmp + '/frontend/**/*.html'
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'projectname'
    }))
    .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: paths.tmp + '/partials',
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(paths.tmp + '/serve/*.html')
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.replace(/https:\/\/localhost:3030\//g, '/'))
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('../bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.replace(/https:\/\/localhost:3030\//g, '/'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(paths.dist + '/'))
    .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

gulp.task('images', function () {
  return gulp.src([paths.src + '/**/*.{jpg,jpeg,png}', '!'+'/**/*/*-sprite*'])
    .pipe($.rename({dirname: ''}))
    .pipe(gulp.dest(paths.dist + '/assets/images/'));
});

gulp.task('images_tmp', function () {
  return gulp.src(paths.src + '/**/*.{jpg,jpeg,png,svg}')
    .pipe($.rename({dirname: ''}))
    .pipe(gulp.dest(paths.tmp + '/serve/assets/images/'));
});
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('misc', function () {
  gulp.src(paths.src + '/frontend/dirPagination.tpl.html')
    .pipe(gulp.dest(paths.dist + '/'));
  return gulp.src(paths.src + '/**/*.ico')
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('misc_tmp', function () {
  return gulp.src(paths.src + '/frontend/dirPagination.tpl.html')
    .pipe(gulp.dest(paths.tmp + '/serve/'));
});

gulp.task('clean', function (done) {
  $.del([paths.dist + '/', paths.tmp + '/'], done);
});

gulp.task('copy_server', ['html'], function () {
  gulp.src(paths.tmp + '/serve/backend/**/*')
    .pipe(gulp.dest(paths.dist + '/backend/'));
  return gulp.src(paths.tmp + '/serve/server.js')
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('build', ['images', 'fonts', 'misc', 'copy_server']);
