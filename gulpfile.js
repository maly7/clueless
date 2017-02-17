var gulp = require('gulp');
var install = require('gulp-install');
var gls = require('gulp-live-server');


gulp.task('npm-install', function () {
    return gulp.src('./package.json')
        .pipe(install());
});

gulp.task('server', function() {
    var server = gls.new('bin/www');
    server.start();
});