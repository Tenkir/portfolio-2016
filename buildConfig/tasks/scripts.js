var paths = require('../paths');

module.exports = function(gulp, $, reload, gutil) {
  return function() {
    gulp.src(paths.srcPaths.scripts + '/**/*.js')
        .pipe($.concat('scripts.min.js'))
        .pipe(gutil.env.prod ? $.uglify() : gutil.noop())
        .pipe(gulp.dest(paths.distPaths.scripts))
        .pipe(reload({stream: true}));
  };
};
