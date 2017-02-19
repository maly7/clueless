var gulp = require('gulp');
var install = require('gulp-install');
var gls = require('gulp-live-server');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');

var specs = ['src/**/*Spec.js'];
var srcFiles = ['app.js', 'src/**/*.js', 'routes/**/*.js', 'bin/www'];

gulp.task('npm-install', function () {
    return gulp.src('./package.json')
        .pipe(install());
});

gulp.task('jasmine', function () {
    return gulp.src(specs)
        .pipe(jasmine({
            reporter: new reporters.TerminalReporter()
        }));
});

gulp.task('tdd', ['jasmine'], function () {
    return gulp.watch(srcFiles, ['jasmine']);
});

gulp.task('server', function () {
    var server = gls.new('bin/www');
    server.start();

    gulp.watch(['public/**/*.css',  'views/**/*.html', 'views/**/*.jade'],  function  (file)  {      
        server.notify.apply(server,   [file]);    
    });

    gulp.watch(srcFiles, function () {
        server.start.bind(server)();
    });
});

gulp.task('default', ['npm-install', 'tdd', 'server']);