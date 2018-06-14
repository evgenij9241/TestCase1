 'use strict';
/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');
var argv = require('yargs').argv;

var env = argv.env || 'development';
var environment = require('../src/environments')[env];

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

exports.env = env;
exports.environment = environment;

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  directory: 'src/vendor',
  fileTypes: {
    html: {
      replace: {
        js: '<script src="/{{filePath}}"></script>',
        css: '<link rel="stylesheet" href="/{{filePath}}">'
      }
    }
  },
  exclude: [ /bootstrap.js/, '/jquery/', '/json3/', '/es5-shim/' ],
};

exports.translationsConf = {
  script: 'http://web.viralcasino.net/lang-converter/lucky',
  url: 'http://web.viralcasino.net/lang-convert-lucky/default',
  user: 'langconvert',
  pass: 'gh0QfsrSbB'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};

