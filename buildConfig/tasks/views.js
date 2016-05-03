var paths = require('../paths');

module.exports = function(gulp, $, reload, gutil) {
  return function() {
    return gulp.src([
      paths.srcPaths.index,
      paths.srcPaths.views + '/**/*.jade'
    ])
      .pipe($.jade({pretty: true}))
      .pipe(gulp.dest(paths.distPaths.base))
      .pipe(reload({stream: true}));
  };
};
