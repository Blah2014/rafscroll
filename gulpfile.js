var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build-polyfill', ['lint'], function() {
  return gulp.src(['./src/lib/rAF.js', './src/rafscroll.js'])
    .pipe(uglify('rafscroll.polyfill.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['lint'], function() {
  return gulp.src('./src/rafscroll.js')
    .pipe(uglify('rafscroll.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build', 'build-polyfill']);
