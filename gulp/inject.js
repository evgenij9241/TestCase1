'use strict'

var path = require('path')
var gulp = require('gulp')
var conf = require('./conf')

var $ = require('gulp-load-plugins')()

var wiredep = require('wiredep').stream
var _ = require('lodash')

var NGIF_FOR_STYLES = {
  'app.css': '!$root.isPayAndPlayCountry',
  'pnp.css': '$root.isPayAndPlayCountry'
}

gulp.task('inject', ['scripts', 'styles', 'styles-pnp'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/assets/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/assets/css/vendor.css')
  ], { read: false })

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js')
  ])
    .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'))

  var injectJsOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: true
  }

  var count = 0

  var injectStylesOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: true,
    transform: function (filePath, file, index, length) {
      count++
      if (count < 3 && index !== 0) return '' // first time serve app.css only
      if (count > 2 && index === 0) return '' // second time serve pnp.css only

      // console.log('INJECTING:', filePath, index, count)
      let ngif = ''
      for (let key in NGIF_FOR_STYLES) {
        if (filePath.includes(key)) ngif = NGIF_FOR_STYLES[key]
      }
      return `<link rel="stylesheet" href="${filePath}" ng-if="${ngif}">`
    }
  }

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectStylesOptions))
    .pipe($.inject(injectScripts, injectJsOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')))
})

gulp.task('inject:constants', function () {
  var injectTranslations = gulp.src(path.join(conf.paths.src, '/data/translations/en.json'))
  var injectTranslationOptions = {
    transform: function (filePath, file) {
      return 'defaultTranslation: ' + file.contents.toString('utf8').replace(/\n/g, '').replace(/\s{2,}/g, ' ')
    },
    starttag: '/* injector:translations */',
    endtag: '/* endinjector */'
  }

  var injectLanguages = gulp.src(path.join(conf.paths.src, '/data/translations/*.json'))
  var injectLanguageOptions = {
    transform: function (filePath, file, index, length) {
      var language = (filePath.match(/([^/]+)\.json$/) || [])[1] || ''
      return '\'' + language + '\'' + ((index + 1) < length ? ', ' : '')
    },
    starttag: '/* injector:languages */',
    endtag: '/* endinjector */'
  }

  var injectEnv = gulp.src(path.join(conf.paths.src, 'environments.json'))
  var injectEnvOptions = {
    transform: function () {
      return 'ENV: ' + JSON.stringify(conf.environment) + ','
    },
    starttag: '/* injector:env */',
    endtag: '/* endinjector */'
  }

  return gulp.src(path.join(conf.paths.src, '/app/constants.js'))
    .pipe($.inject(injectTranslations, injectTranslationOptions))
    .pipe($.inject(injectLanguages, injectLanguageOptions))
    .pipe($.inject(injectEnv, injectEnvOptions))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app')))
})
