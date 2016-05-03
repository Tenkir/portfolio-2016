var paths = require('../paths');

module.exports = function(gulp, $) {
  return function() {
    return gulp.src([
      paths.srcPaths.base + '/*.*',
      '!' + paths.srcPaths.base + '/*.html',
      '!' + paths.srcPaths.base + '/*.jade'
    ], {
      dont: true
    }).pipe(gulp.dest(paths.distPaths.base));
  };
};
