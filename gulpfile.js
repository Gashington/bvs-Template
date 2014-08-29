var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require ('gulp-connect')


// Задача по умолчанию.
gulp.task('default', function () {
    gulp.start('server','stylus', 'watch'); // запуск сервера, компиляция stylus
});
// Задача по зборке проекта в папку app.

gulp.task('watch', function () {
    gulp.watch(['./source/*.html'], ['html']);
});

gulp.task('html', function () {
    console.log(true)
    gulp.src('dest/*.html')
        .pipe(connect.reload());
});

gulp.task('stylus', function () {
    gulp.src(['source/stylus/*.styl', '!source/stylus/mixin/*.styl'])
        .pipe(stylus())
        .pipe(gulp.dest('source/css'));
});


gulp.task('img-min', function () {
    gulp.src('source/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img'))
});

gulp.task('server', function(){
    connect.server({
        root: ['./source'],
        port: 3000,
        keepalive: true,
        livereload: true
    })
});


