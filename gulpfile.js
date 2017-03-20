var gulp = require('gulp');
var install = require('gulp-install');
var gls = require('gulp-live-server');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');
var browserify = require('gulp-browserify');
var del = require('del');

var buildDir = 'public/build/js';
var clientJs = ['public/javascripts/**.js'];
var specs = ['src/**/*Spec.js'];
var srcFiles = ['app.js', 'src/**/*.js', 'routes/**/*.js', 'bin/www'];
var allFiles = specs.concat(srcFiles);

gulp.task('clean', function () {
    return del([buildDir]);
});

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
    return gulp.watch(allFiles, ['jasmine']);
});

gulp.task('browserify', ['clean'], function () {
    return gulp.src(clientJs)
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('scripts', ['browserify'], function() {
    return gulp.watch(clientJs, ['browserify']);
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

gulp.task('build', ['npm-install', 'scripts', 'tdd', 'server']);

gulp.task('default', ['build']);