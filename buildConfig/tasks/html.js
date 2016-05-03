var paths = require('../paths');

module.exports = function(gulp, $, reload) {
  return function() {
    const assets = $.useref.assets({searchPath: ['dest', 'app', '.']});

    return gulp.src(paths.distPaths.index)
      .pipe($.useref())
      .pipe(gulp.dest(paths.distPaths.base));
  };
};
