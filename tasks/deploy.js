var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', ['default'], function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});
