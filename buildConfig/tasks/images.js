var paths = require('../paths');

module.exports = function(gulp, $) {
  return function() {
    return gulp.src(paths.srcPaths.images + '/**/*')
      .pipe($.if($.if.isFiles, $.cache($.imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{cleanupIDs: false}]
      }))
    .on('error', function(err) {
      console.log(err);
      this.end()
    })))
    .pipe(gulp.dest(paths.distPaths.images));
  };
};
