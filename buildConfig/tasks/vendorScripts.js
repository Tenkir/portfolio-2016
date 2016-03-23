// Concat and uglify vendor packages for production.

var paths = require('../paths');
var mainBowerFiles = require('gulp-main-bower-files');

module.exports = function(gulp, $, reload, gutil) {
  return function() {
    var filterJS = $.filter('**/*.js', { restore: true });

    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filterJS)
        .pipe($.concat('vendor.min.js'))
        .pipe($.uglify())
        .pipe(filterJS.restore)
        .pipe(gulp.dest(paths.distPaths.scripts));
  };
};
