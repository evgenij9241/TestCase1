'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var conf = require('./conf');
var request = require('request');
var map = require('map-stream');
var source = require('vinyl-source-stream');

var script = conf.translationsConf.script,
    url = conf.translationsConf.url,
    user = conf.translationsConf.user,
    pass = conf.translationsConf.pass;

gulp.task('translations', function () {
  var error = false;

  gutil.log('Converting GoogleDoc to JSON...');

  return request(script, {
      auth: {
        user: user,
        pass: pass,
        sendImmediately: false
      }
    })
    .pipe(map(function (data, callback) {
      if (error || !/^[\s]*Done[\s]*$/.test(data)) {
        error = true;

        gutil.log(gutil.colors.red(data));

        callback();
        return;
      }

      gutil.log('Converted');
      gutil.log('Downloading files...');

      request(url, {
          auth: {
            user: user,
            pass: pass,
            sendImmediately: false
          }
        })
        .pipe(map(function (data, cb) {
          var regex = new RegExp('[a-zA-Z0-9_]+\.json', 'g'),
              files = data.toString().match(regex) || [],
              finished = 0;

          // Unique only
          files = files.filter(function(item, pos) {
            return files.indexOf(item) === pos;
          });

          for (var i = 0, length = files.length; i < length; i++) {
            var file = files[i];

            request(url + '/' + file, {
                auth: {
                  user: user,
                  pass: pass,
                  sendImmediately: false
                }
              })
              .pipe(source(file))
              .pipe(gulp.dest(path.normalize('src/data/translations')))
              .pipe(map(exit));
          }

          function exit(d, c) {
            c(null, d);

            if (++finished === length) {
              gutil.log('Downloaded');

              cb();
              callback();
            }
          }
        }));
    }));
});
