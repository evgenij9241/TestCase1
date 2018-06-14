'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');

var cssmin = require('gulp-cssmin');
var minify = require('gulp-minify');
var uglify = require('gulp-uglifyjs');
var rename = require("gulp-rename");
var ngmin = require('gulp-ngmin');
var ngAnnotate = require('gulp-ng-annotate');

var path = require('path');
var conf = require('./conf');
var cdnify = require('gulp-cdnify');
var runSequence = require('run-sequence').use(gulp);

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.tmpl.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.tmpl.html')
  ])
    .pipe(cdnify({
      html: {
        'img[src]': 'src',
        'img[ng-src]': 'ng-src'
      },
      rewriter: function(url) {
        if (/(png)$/.test(url) && url.indexOf('icon-sprite') < 0) {
          return conf.environment.assets + url.replace('/assets', '');
        }
        return url;
      }
    }))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'finnplay',
      root: '/app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'inject:constants', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    // .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    //.pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

gulp.task('cssmin', function () {
  return gulp.src(conf.paths.dist + '/styles/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest(conf.paths.dist + '/styles'))
    .pipe($.size({ title: path.join(conf.paths.dist, '/styles'), showFiles: true }));
});

gulp.task('jsmin', function() {
  return gulp.src(conf.paths.dist + '/scripts/**/*.js')
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(minify({
      noSource: true,
      beautify : true,
      mangle   : false
    }))
    .pipe(gulp.dest(conf.paths.dist + '/scripts'))
    .pipe(rename(function (_path) {
      _path.basename = _path.basename.replace('-min', '');
    }))
    .pipe(gulp.dest(conf.paths.dist + '/scripts'))
    .pipe($.size({ title: path.join(conf.paths.dist, '/scripts'), showFiles: true }));
});

gulp.task('remove-min', function () {
  return gulp.src(conf.paths.dist + '/scripts/**/*-min.js', {read: false})
    .pipe(clean());
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('copy-other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*.*'),
    // path.join(conf.paths.tmp, '/sprites/view/*.*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss,svg}'),
    path.join('!' + conf.paths.src, '/assets/images/sprites/**/*.*'),
    path.join('!' + conf.paths.src, '/assets/animations/**/*'),
    path.join('!' + conf.paths.src, '/vendor/**/*.*')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('copy-animations', function () {
  return gulp.src([
    path.join(conf.paths.src, '/assets/animations/**/*.*')
  ]).pipe(gulp.dest(path.join(conf.paths.dist, '/assets/animations')));

});

gulp.task('copy-interfaces', function () {
  return gulp.src([
    path.join(conf.paths.src, '/data/interfaces/**/*.*')
  ]).pipe(gulp.dest(path.join(conf.paths.dist, '/data/interfaces')));

});

gulp.task('copy-reviews', function () {
  return gulp.src([
    path.join(conf.paths.src, '/data/games-review/**/*.*')
  ]).pipe(gulp.dest(path.join(conf.paths.dist, '/data/games-review')));

});

gulp.task('copy-svg', function () {
  return gulp.src([
    path.join(conf.paths.src, '/assets/svg/*.svg'),
  ])
    .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/svg/')));
});

gulp.task('war-package', function () {
  return gulp.src(path.join(conf.paths.dist, '/**/*'))
    .pipe($.zip('build.war'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function (done) {
  $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

gulp.task('build-no-war', function (done) {
  runSequence(
    'clean',
    ['svg', 'sprites'],
    ['html', 'fonts', 'copy-other', 'copy-animations', 'copy-svg', 'copy-interfaces'], 'copy-reviews',
    'cssmin',
    'jsmin', 'remove-min',
    done
  );
});

gulp.task('build', function (done) {
  runSequence(
    'build-no-war',
    'war-package',
    done
  );
});
