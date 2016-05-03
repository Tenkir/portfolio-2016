var paths = require('../paths');
import gutil from 'gulp-util';

var onError = function (err) {
  gutil.beep();
  console.log(err);
};

module.exports = function(gulp, $, reload, gutil) {
  return function() {
    return gulp.src(paths.srcPaths.styles + '/**/*.scss')
      .pipe($.plumber({
        errorHandler: onError
      }))
      .pipe(gutil.env.prod ? gutil.noop() : $.sourcemaps.init())
      .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
      }).on('error', $.sass.logError))
      .pipe($.autoprefixer({browsers: ['last 1 version']}))
      .pipe(gutil.env.prod ? gutil.noop() : $.sourcemaps.write())
      .pipe(gulp.dest(paths.distPaths.styles))
      .pipe(reload({stream: true}));
  };
};
