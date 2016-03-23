var paths = require('../paths');
import browserify  from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import debowerify from 'debowerify';
import babelify from 'babelify';
import browserifyShim from 'browserify-shim';

module.exports = function(gulp, $, reload, gutil) {
  return function() {
    var b = browserify({
      entries: paths.srcPaths.scripts + '/main.js',
      debug: true,
    });

    b.transform(debowerify);
    b.transform(babelify);
    b.transform(browserifyShim);

    return b.bundle()
      .pipe(source('scripts.min.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.uglify())
        .on('error', gutil.log)
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.distPaths.scripts));
  }
}
