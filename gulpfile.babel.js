import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import gutil from 'gulp-util';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var paths = require('./buildConfig/paths');

function getTask(task) {
  return require('./buildConfig/tasks/' + task)(gulp, $, reload, gutil);
}

gulp.task('styles', getTask('styles'));
gulp.task('scripts', getTask('scripts'));
gulp.task('vendorScripts', getTask('vendorScripts'));
gulp.task('views', getTask('views'));
gulp.task('images', getTask('images'));
gulp.task('fonts', getTask('fonts'));
gulp.task('extras', getTask('extras'));
gulp.task('html', getTask('html'));
gulp.task('lint', getTask('lint'));
gulp.task('inject', getTask('inject'));
gulp.task('clean', del.bind(null, 'dist'));
gulp.task('browserify', getTask('browserify'));

gulp.task('wiredep', () => {
  gulp.src(paths.srcPaths.styles + '/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest(paths.srcPaths.styles));

  gulp.src(paths.srcPaths.base + '/layouts/*.jade')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest(paths.srcPaths.base + '/layouts'));
});


gulp.task('serve', ['views', 'styles', 'browserify', 'inject', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'dist/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'dist/fonts/**/*'
  ]).on('change', reload);
  gulp.watch('app/**/*.jade', ['views']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
  gulp.watch('app/scripts/**/*.js', ['browserify']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('build', ['lint', 'views', 'styles', 'browserify', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
