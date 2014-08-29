var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require ('gulp-connect'),
    minifyCSS = require('gulp-minify-css');


// Задачи выполняемые при старте.
gulp.task('default', function () {
    gulp.start([
        'dev-server',
        'stylus',
        'watch'
    ]);
});

// запуск сервера
gulp.task('dev-server', function(){
    connect.server({
        root: ['./source'],
        port: 3000,
        keepalive: true,
        livereload: true
    })
});

// Включаем наблюдателей в рабочей директории
gulp.task('watch', function () {
    gulp.watch(['./source/*.html'], ['html']); // наблюдение за файлами  *.html
    gulp.watch(['./source/stylus/**/*.styl'], ['stylus']); // наблюдение за файлами  *.styl
    gulp.watch(['./source/css/**/*.css'], ['css']); // наблюдение за файлами  *.css
    gulp.watch(['./source/css/**/*.js'], ['js']); // наблюдение за файлами  *.js
    gulp.watch(['./source/img/**/*.{png,jpg,gif}'], ['img']); // наблюдение за изображениями
});

    // перезагрузка страницы при изменении и добавлении *.html
    gulp.task('html', function () {
        gulp.src('dest/*.html')
            //.pipe(connect.reload());
    });

    // перезагрузка страницы при изменении и добавлении изображений
    gulp.task('img', function () {
        gulp.src('./source/img/**/*.{png,jpg,gif}')
            //.pipe(connect.reload());
    });
    // перезагрузка страницы при изменении и добавлении изображений
    gulp.task('css', function () {
        gulp.src('./source/css/**/*.css')
            //.pipe(connect.reload());
    });

    // перезагрузка страницы при изменении и добавлении .*js
    gulp.task('js', function () {
        gulp.src('./source/js/**/*.js')
            .pipe(connect.reload());
    });

    // компиляция stylus
    gulp.task('stylus', function () {
        gulp.src(['source/stylus/*.styl', '!source/stylus/mixin/*.styl'])
            .pipe(stylus())
            .pipe(gulp.dest('source/css'))
    });

// Задача по сборке проекта в папку ./app.
gulp.task('build', function () {
    gulp.start([
        'build-css',
        'build-js',
        'img-min',
        'copy-html',
        'copy-css',
        'copy-js'
    ]);
});
    // сборка js
    gulp.task('build-js', function() {
        gulp.src(['./source/js/vendor/*jquery-1.11.1.js', './source/js/plugins.js', './source/js/main.js'])
            .pipe(concat('build.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('app/js'));
    });

    // сборка css
    gulp.task('build-css', function() {
        gulp.src(['./source/css/vendor/normalize.css', './source/css/main.css', './source/css/widgets.css'])
            .pipe(concat('build.min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('app/css'));
    });

    // оптимизация изображений
    gulp.task('img-min', function () {
        gulp.src('./source/img/**/*.{png,jpg,gif}')
            .pipe(imagemin())
            .pipe(gulp.dest('./app/img'))
    });

    // копирование *.html в папку проекта
    gulp.task('copy-html', function () {
        gulp.src(['./source/*.html'], { base: './source' })
            .pipe(gulp.dest('./app'))
    });

    // копирование *.css в папку проекта
    gulp.task('copy-css', function () {
        gulp.src(['./source/css/**/*.css'], { base: './source/css' })
            .pipe(gulp.dest('./app/css'))
    });

    // копирование *.js в папку проекта
    gulp.task('copy-js', function () {
        gulp.src(['./source/js/**/*.js'], { base: './source/js' })
            .pipe(gulp.dest('./app/js'))
    });



