var gulp = require('gulp')
var install = require('gulp-install')
var conflict = require('gulp-conflict')
var template = require('gulp-template')
var inquirer = require('inquirer')
var path = require('path')

var defaults = (function () {
	homeDir = process.env.USERPROFILE
	configFile = path.join(homeDir, '.gitconfig')
	if (require('fs').existsSync(configFile)) {
		user = require('iniparser').parseSync(configFile).user
	}
	return {
		version: '0.1.0',
		description: '',
		main: '',
		author: {
			name: user.name,
			email: user.email
		},
		licences: ['ISC', 'MIT', 'BSD']
	}
})()

gulp.task('default', function (done) {
	inquirer.prompt([
		{type: 'input', name: 'name', message: 'Name:', default: gulp.args.join(' ')},
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
		gulp.src(__dirname + '/templates/app/**')
			.pipe(template(answers))
			.pipe(conflict('./'))
			.pipe(gulp.dest('./'))
			.pipe(install())
			.on('finish', function () {
				done()
			})
	})
})
