var gulp = require('gulp')
var babel = require('gulp-babel')
var nodemon = require('gulp-nodemon')
var merge = require('merge-stream')
var livereload = require('gulp-livereload')

gulp.task('default', ['server'], () => {
	livereload.listen()
	nodemon({
		script: 'dist',
		watch: 'src/**/*.*',
		tasks: ['server']
	}).on('restart', () => {
		livereload.reload()
	})
})

gulp.task('server', function () {
	var javascript = gulp.src('src/server/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist'))

	var html = gulp.src('src/server/**/*.html')
		.pipe(gulp.dest('dist'))

	return merge(javascript, html)
})
