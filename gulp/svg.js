'use strict';

var gulp     = require('gulp');
var svgmin   = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var rename   = require('gulp-rename');
var path     = require('path');
var conf     = require('./conf');


gulp.task('svg', function () {
	return gulp.src(path.join(conf.paths.src, '/assets/svg/all/*.svg'))
		.pipe(svgmin())
    .pipe(rename({prefix: 'icon-'}))
		.pipe(svgstore({inlineSvg: true}))
    .pipe(rename('icons.svg'))
		.pipe(gulp.dest(path.join(conf.paths.src, '/assets/svg/')));
});
