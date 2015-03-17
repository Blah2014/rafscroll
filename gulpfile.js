var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');

// I had a lot of trouble getting the minifier to work without breaking my code.
// This custom comments script was necessary, but everything seems to work now.
var uglifyConfig = {
  output: {
    comments: function(node, comment) {
      var text = comment.value;
      var type = comment.type;

      if (type == "comment2") {
        return /@preserve|@license|@cc_on/i.test(text);
      }
    }
  }
};

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build-polyfill', ['lint'], function() {
  return gulp.src(['./src/lib/bind.js', './src/lib/rAF.js', './src/rafscroll.js'])
    .pipe(concat('rafscroll.polyfill.min.js'))
    .pipe(uglify(uglifyConfig))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['lint'], function() {
  return gulp.src('./src/rafscroll.js')
    .pipe(uglify(uglifyConfig))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build', 'build-polyfill']);
