'use strict';

let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');

let cdnify = require('gulp-cdnify');
let browserSync = require('browser-sync');

let $ = require('gulp-load-plugins')();

let wiredep = require('wiredep').stream;
let _ = require('lodash');

gulp.task('styles-pnp', function () {
  let sassOptions = {
    style: 'expanded'
  };

  let injectFilesPNP = gulp.src([
    path.join(conf.paths.src, '/app/**/*.pnp.scss'),
    path.join('!' + conf.paths.src, '/assets/css/pnp.scss')
  ], { read: false });

  let injectOptionsPNP = {
    transform: function(filePath) {
      // filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injectorPNP',
    endtag: '// endinjectorPNP',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/assets/css/pnp.scss')
  ])
    .pipe($.inject(injectFilesPNP, injectOptionsPNP))
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
