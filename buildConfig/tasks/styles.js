var paths = require('../paths');

module.exports = function(gulp, $, reload, gutil) {
  return function() {
    return gulp.src(paths.srcPaths.styles + '/**/*.scss')
      .pipe($.plumber())
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
