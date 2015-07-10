var gulp = require('gulp');
var gulpif = require('gulp-if');
var sprite = require('css-sprite').stream;
var paths = gulp.paths;

var name ="slider"

// generate scss with base64 encoded images
gulp.task('create-sprites', function () {
  return gulp.src(paths.src + '/**/*-sprite.{jpg,jpeg,png}')
    .pipe(sprite({
      base64: false,
      style: name + '-sprites-base64.scss',
      processor: 'scss',
      orientation: 'horizontal',
      name: name
    }))
    .pipe(gulp.dest(paths.src +'/assets/sprites/'));
});
