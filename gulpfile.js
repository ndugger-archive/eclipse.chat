var gulp = require('gulp'),
	babel = require('gulp-babel'),
	browserify = require('gulp-browserify');

gulp.task('build server', function()
{
	gulp.src('server/src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('server/build/'));
	gulp.src('server/src/routes.json')
		.pipe(gulp.dest('server/build/'));
});

gulp.task('build client', function()
{
	gulp.src('client/public/js/src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('client/public/js/temp/'));
	gulp.src('client/public/js/temp/client.js')
		.pipe(browserify())
		.pipe(gulp.dest('client/public/js/build/'));
});

gulp.task('default', ['build server', 'build client'], function() {});