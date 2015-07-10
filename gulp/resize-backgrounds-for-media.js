var gulp = require('gulp');
var paths = gulp.paths;
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");
//Images which shall be resized have a # before their fileending
gulp.task('resize-backgrounds', function () {
  function resizeBg(size){
    gulp.src(paths.src + '/**/*-bg.{jpg,jpeg,png}')
    .pipe(imageResize({
      width : size,
      crop : false,
      upscale : false,
      format : 'jpeg'
      //format : 'png'

    }))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(rename(function (path) {
        path.basename += "-"+size+"px";
    }))
    .pipe(gulp.dest(paths.src));
  }
  resizeBg(1200);
  resizeBg(992);
  resizeBg(768);
  resizeBg(480);

});