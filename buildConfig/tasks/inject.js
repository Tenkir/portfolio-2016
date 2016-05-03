var paths = require('../paths');

module.exports = function(gulp, $, reload, gutil) {
  return function() {
    var target
      , sources;

    sources = gulp.src([
      paths.distPaths.scripts + '/**/*.js',
      paths.distPaths.styles + '/**/*.css'
    ], {read: false});

    target = gulp.src(paths.distPaths.index);

    return target.pipe($.inject(sources))
      .pipe(gulp.dest(paths.distPaths.base));
  }
};
