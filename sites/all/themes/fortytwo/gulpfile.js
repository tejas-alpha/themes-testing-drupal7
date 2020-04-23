/**
 * @file
 * Gulpfile for fortytwo.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

/**
 * @task sass-lint
 * Lint sass, abort calling task on error
 */
gulp.task('sass-lint', function () {
  return gulp.src('static/sass/**/*.scss')
    .pipe($.debug({title: 'sass-lint:'}))
    .pipe($.sassLint({configFile: '.sass-lint.yml'}))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
});

gulp.task('sass-compile', ['sass-lint'], function () {
  // postCss plugins and processes
  var pcPlug = {
    autoprefixer: require('autoprefixer'),
    mqpacker: require('css-mqpacker'),
  };
  var pcProcess = [
    pcPlug.autoprefixer({
      browsers: ['last 2 versions', 'IE 9', 'IE 10', 'IE 11']
    }),
    pcPlug.mqpacker(),
  ];

  return gulp.src('static/sass/**/*.scss')
    .pipe($.debug({title: 'sass-compile:'}))
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .on('error', function (err) {
      console.log(err);
      this.emit('end');
    })
    .pipe($.postcss(pcProcess))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('static/css'));
});

/**
 * @task clean
 * Clean the dist folder.
 */
gulp.task('clean', function () {
  return del(['static/css/*']);
});

/**
 * @task watch
 * Watch files and do stuff.
 */
gulp.task('watch', ['clean', 'sass-compile'], function () {
  gulp.watch('static/sass/**/*.scss', ['sass-compile']);
});

/**
 * @task default
 * Watch files and do stuff.
 */
gulp.task('default', ['watch']);

