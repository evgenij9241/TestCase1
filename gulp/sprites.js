'use strict';

var gulp        = require('gulp');
var path        = require('path');
var conf        = require('./conf');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprites', function() {
  var imgName = 'icon-sprite.png';
  var imgPath = '/assets/images/icon-sprite.png';
  var retinaImgName = 'icon-sprite@2x.png';
  var retinaImgPath = '/assets/images/icon-sprite@2x.png';
  var timestamp = Date.now();

  var spriteConf = {
      src: path.join(conf.paths.src, '/assets/images/sprites/*.png'),
      dest: {
        css:   path.join(conf.paths.src, '/assets/css/'),
        image: path.join(conf.paths.src, '/assets/images/')
      },
      options: {
        cssName:   '_sprites.scss',
        cssOpts: {
          cssSelector: function (item) {
            // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
            if (item.name.indexOf('-hover') !== -1) {
              return '.icon--' + item.name.replace('-hover', ':hover');
              // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
            } else {
              return '.icon--' + item.name;
            }
          }
        },
        imgName: imgName,
        imgPath: imgPath + '?v=' + timestamp,
        retinaSrcFilter: [path.join(conf.paths.src, '/assets/images/sprites/*@2x.png')],
        retinaImgName: retinaImgName,
        retinaImgPath: retinaImgPath + '?v=' + timestamp,
        padding: 4
      }
  };

  /**
   * Generate sprite and css file from PNGs
   */

  var spriteData = gulp.src(spriteConf.src).pipe(spritesmith(spriteConf.options));

  spriteData.img
    .pipe(gulp.dest(spriteConf.dest.image));

  spriteData.css
    .pipe(gulp.dest(spriteConf.dest.css));

});


