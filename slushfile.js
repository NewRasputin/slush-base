var gulp = require('gulp')
var install = require('gulp-install')
var conflict = require('gulp-conflict')
var template = require('gulp-template')
var gutil = require('gulp-util')
var inquirer = require('inquirer')
var path = require('path')

gulp.task('default', function (done) {
	var defaults = (function () {
		homeDir = process.env.USERPROFILE
		configFile = path.join(homeDir, '.gitconfig')
		if (require('fs').existsSync(configFile)) {
			user = require('iniparser').parseSync(configFile).user
		}
		return {
			name () {
				return gulp.args.join(' ')
			},
			version: '0.1.0',
			description: '',
			main: 'dist/',
			author: {
				name: user.name,
				email: user.email
			},
			licences: ['ISC', 'MIT', 'BSD']
		}
	})()
	inquirer.prompt([
		{type: 'input', name: 'name', message: 'Name:', default: defaults.name()},
		{type: 'input', name: 'version', message: 'Version:', default: defaults.version},
		{type: 'input', name: 'description', message: 'Description:', default: defaults.description},
		{type: 'input', name: 'main', message: 'Entry point:', default: defaults.main},
		{type: 'input', name: 'author', message: 'Author:', default: defaults.author.name},
		{type: 'input', name: 'email', message: 'Email:', default: defaults.author.email},
		{type: 'list', name: 'license', message: 'License:', choices: defaults.licences, default: defaults.licences[0]},
		{type: 'confirm', name: 'ready', message: 'Ready?'}
	]).then(function (answers) {
		if (!answers.ready) {
			return done()
		}
		return gulp.src(__dirname + '/templates/app/**', { dot: true })
			.pipe(template(answers))
			.pipe(conflict(defaults.name()))
			.pipe(gulp.dest(defaults.name()))
			.pipe(install())
			.on('end', function () {
				done()
				gutil.log('cd', defaults.name())
				gutil.log('gulp dev')
			})
			.resume()
	})
})
