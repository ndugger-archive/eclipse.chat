var gulp = require('gulp'),
	less = require('gulp-less'),
	babel = require('gulp-babel'),
	browserify = require('gulp-browserify');

/* Build Server
************************/
gulp.task('build server', function() {
	gulp.src('src/server/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('build/server/'));
});

/* Build Client
************************/
gulp.task('build client', [
	'build client js 2',
	'build client styles',
	'move client images',
	'move client views'
]);

gulp.task('build client js 2', ['build client js 1'], function() {
	gulp.src('src/temp/client.js')
		.pipe(browserify())
		.pipe(gulp.dest('build/client/public/js/'));
});
gulp.task('build client js 1', function() {
	gulp.src('src/client/public/js/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('src/temp/'))
});

gulp.task('build client styles', function() {
	gulp.src('src/client/public/less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('build/client/public/css/'));
});

gulp.task('move client images', function() {
	gulp.src('src/client/public/img/**/*')
		.pipe(gulp.dest('build/client/public/img/'));
});

gulp.task('move client views', function() {
	gulp.src('src/client/views/**/*')
		.pipe(gulp.dest('build/client/views/'))	;
});

/* Deploy Build
************************/
gulp.task('deploy', function() {

});

gulp.task('default', ['build server', 'build client'], function() {});