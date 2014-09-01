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
        root: ['./dev'],
        port: 3000,
        keepalive: true,
        livereload: true
    })
});

// Включаем наблюдателей в рабочей директории
gulp.task('watch', function () {
    gulp.watch(['./dev/**/*.*','!./dev/stylus/**/*.*'], ['reload']); // наблюдение за файлами всеми файлами исключая *.styl
    gulp.watch(['./dev/stylus/**/*.styl'], ['stylus']); // наблюдение за файлами  *.styl
});

    // перезагрузка страницы при изменении и добавлении файлов в dev директории
    gulp.task('reload', function () {
        gulp.src('./dev/**/*.*')
            .pipe(connect.reload());
    });


    // компиляция stylus
    gulp.task('stylus', function () {
        gulp.src(['./dev/stylus/*.styl', '!dev/stylus/mixin/*.styl'])
            .pipe(stylus())
            .pipe(gulp.dest('./dev/css'))
    });

// Задача по сборке проекта в папку ./app.
gulp.task('build', function () {
    gulp.start([
        'build-css',
        'build-js',
        'img-min',
        'copy-source',
    ]);
});
    // сборка js
    gulp.task('build-js', function() {
        gulp.src(['./dev/js/vendor/*jquery-1.11.1.js', './dev/js/plugins.js', './dev/js/main.js'])
            .pipe(concat('build.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('app/js'));
    });

    // сборка css
    gulp.task('build-css', function() {
        gulp.src(['./dev/css/vendor/normalize.css', './dev/css/main.css', './dev/css/widgets.css'])
            .pipe(concat('build.min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('app/css'));
    });

    // оптимизация изображений
    gulp.task('img-min', function () {
        gulp.src('./dev/img/**/*.{png,jpg,gif}')
            .pipe(imagemin())
            .pipe(gulp.dest('./app/img'))
    });

    // копирование *.html в папку проекта
    gulp.task('copy-source', function () {
        gulp.src(['./dev/**/*.*','!./dev/img/**/*.*'], { base: './dev' })
            .pipe(gulp.dest('./app'))
    });




