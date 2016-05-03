var paths = require('../paths');

module.exports = function(gulp, $) {
  return function() {
    return gulp.src(require('main-bower-files')({
      filter: '**/*.{eot,svg,ttf,woff,woff2}'
    }).concat(paths.srcPaths.base + '/fonts/**/*'))
      .pipe(gulp.dest(paths.distPaths.base + '/fonts'));
  };
};
