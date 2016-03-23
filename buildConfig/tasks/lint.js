var paths = require('../paths');

module.exports = function(gulp, $, reload) {
  return function() {
    return gulp.src(paths.srcPaths.scripts + '/**/*.js')
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint())
      .pipe($.eslint.format())
  };
};
