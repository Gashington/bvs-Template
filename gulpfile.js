var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require ('gulp-connect'),
    spritesmith  = require('gulp.spritesmith'),
    minifyCSS = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace'),
    autoprefixer = require('gulp-autoprefixer')
    rename = require("gulp-rename"),
    watch = require('gulp-watch'),
    jsArr = [
        '/js/vendor/jquery-1.11.1.js',
        '/js/vendor/fancybox.js',
        '/js/vendor/fancybox.js',
        '/js/plugins.js',
        '/js/main.js',
    ],
    cssArr = [
        '/css/normalize.css',
        '/css/misc.css',
        '/css/main.css',
        '/css/widgets.css',
        '/css/media.css',
    ]


// Задачи выполняемые при старте.
gulp.task('default', function () {
    gulp.start([
        'htmlconfig',
        'dev-server',
        'stylus',
        'sprite',
        'watch'
    ]);
});

// конфигурация html
gulp.task('htmlconfig', function() {
    gulp.src('./dev/index.html')
        .pipe(htmlreplace({
            'cssConfig': cssArr,
            'jsConfig': jsArr
        },{keepBlockTags: true}))
        .pipe(rename({
            basename: "index",
        }))
        .pipe(gulp.dest('./dev'));
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
    //gulp.watch(['./dev/img/sprite/*.*'], ['sprite'])
    watch(['./dev/**/*.*'], function (vinly) {
        return vinly
        gulp.start('reload');
        console.error('done reload')
    });
    watch(['./dev/stylus/**/*.styl'], function (vinly) {
        return vinly
        gulp.start('stylus');
        console.error('done')
    });
    watch(['./dev/img/sprite/*.*'], function (vinly) {
        return vinly
        gulp.start('sprite');
        console.error('done-sprite')
    });
    //gulp.watch(['./dev/**/*.*','!./dev/stylus/**/*.*'], ['reload']); // наблюдение за файлами всеми файлами исключая *.styl
    //gulp.watch(['./dev/stylus/**/*.styl'], ['stylus']); // наблюдение за файлами  *.styl
    //gulp.watch(['./dev/img/sprite/*.*'], ['sprite'])
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
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dev/css'))
});

    // Создание спрайта
    gulp.task('sprite', function() {
        var spriteData =
            gulp.src('./dev/img/sprite/*.*') // путь, откуда берем картинки для спрайта
                .pipe(spritesmith({
                    imgName: 'sprite.png',
                    cssName: 'sprite.styl',
                    cssFormat: 'stylus',
                    algorithm: 'binary-tree',
                    cssTemplate: './dev/stylus/stylus.template.mustache',
                    cssVarMap: function(sprite) {
                        sprite.name = 's-' + sprite.name
                    }
                }));

        spriteData.img.pipe(gulp.dest('./dev/img/bg')); // путь, куда сохраняем спрайт
        spriteData.css.pipe(gulp.dest('./dev/stylus/mixin/')); // путь, куда сохраняем стили
    });

// Задача по сборке проекта в папку ./app.
gulp.task('build', function () {
    gulp.start([
        'build-html',
        'build-css',
        'build-js',
        'img-min',
        'app-server',
        'copy-source',

    ]);
});

gulp.task('build-html', function() {
    gulp.src('./dev/*.html')
        .pipe(htmlreplace({
            'cssConfig': '/css/build.min.css',
            'jsConfig': '/js/build.min.js'
        }))
        //.pipe(rename({
        //    basename: "index",
        //}))
        .pipe(gulp.dest('./app'));
});

// сборка js
gulp.task('build-js', function() {
    var newJsArr = []
    for (var i = 0; i<jsArr.length; i++) {
        newJsArr.push('./dev'+jsArr[i])
        console.log(newJsArr[i]);
    }
    gulp.src(newJsArr)
        .pipe(concat('build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js'));
});

// сборка css
gulp.task('build-css', function() {
    var newCssArr = []
    for (var i = 0; i<cssArr.length; i++) {
        newCssArr.push('./dev'+cssArr[i])
        console.log(newCssArr[i]);
    }
    gulp.src(newCssArr)
        .pipe(concat('build.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./app/css'));
});

// оптимизация изображений
gulp.task('img-min', function () {
    gulp.src('./dev/img/**/*.{png,jpg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/img'))
});
gulp.task('app-server', function(){
    connect.server({
        root: ['./app'],
        port: 3001,
        keepalive: true,
        livereload: true
    })
});
// копирование *.html в папку проекта
gulp.task('copy-source', function () {
    gulp.src(['./dev/**/*.*','!./dev/img/**/*.*'], { base: './dev' })
        .pipe(gulp.dest('./app'))
});




