'use strict';

let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');

let cdnify = require('gulp-cdnify');
let browserSync = require('browser-sync');

let $ = require('gulp-load-plugins')();

let wiredep = require('wiredep').stream;
let _ = require('lodash');

gulp.task('styles', function () {
  let sassOptions = {
    style: 'expanded'
  };

  let injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.base.scss'),
    path.join('!' + conf.paths.src, '/assets/css/app.scss')
  ], { read: false });

  let injectOptions = {
    transform: function(filePath) {
      // filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/assets/css/app.scss'),
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(cdnify({
      rewriter: function(url) {
        if (/(png)$/.test(url) && url.indexOf('icon-sprite') < 0) {
          return conf.environment.assets + url.replace('/assets', '');
        }
        return url;
      }
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/assets/css/')))
    .pipe(browserSync.reload({ stream: true }));
});
