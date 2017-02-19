var gulp = require('gulp');
var install = require('gulp-install');
var gls = require('gulp-live-server');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');


gulp.task('npm-install', function () {
    return gulp.src('./package.json')
        .pipe(install());
});

gulp.task('tdd', function () {
    return gulp.src(['src/**/*Spec.js'])
        .pipe(jasmine({
            reporter: new reporters.TerminalReporter()
        }));
});

gulp.task('server', function () {
    var server = gls.new('bin/www');
    server.start();

    gulp.watch(['public/**/*.css',  'views/**/*.html', 'views/**/*.jade'],  function  (file)  {      
        server.notify.apply(server,   [file]);    
    });

    gulp.watch(['app.js', 'src/**/*.js', 'routes/**/*.js', 'bin/www'], function () {
        server.start.bind(server)();
    });
});

gulp.task('default', ['npm-install', 'tdd', 'server']);