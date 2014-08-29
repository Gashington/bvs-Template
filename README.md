#bvsTemplate
Шаблон для быстрой front-end разработки, на основе gulp.js
Данный инструмент предназначен для оптимизации рабочего времени front-end разработчика и быстрой сборке оптимизированного проекта.
###Инструментарий:
* gulp - потоковая система сборки;
* gulp-stylus - препроцессор css(nib);
* gulp-connect - сервер с livereload;
* gulp-imagemin - оптимизатор изображений;
* gulp-concat - объединение фаилов;
* gulp-uglify - минификация js;
* gulp-minify-css - минификация css;


###Установка необходимых инструментов:

1. Скачать и установить последнюю версию [nodeJS](http://nodejs.org/download/)
2. Установка gulp `npm install --global gulp`
3. Ознакомьтесь со статьей [по установке git](http://git-scm.com/book/ru/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git), под Вашу операционную систему

###Установка и запуск
Для начала работы с новым проектом, необходимо выполнить три простых шага:

1. `git clone git@github.com:jslby/fewatcher.git path/to/your/project`
2. Необходимо перейти в папку со своим проектом в консоли: `cd /path/to/your/project`
2. Установка всех зависимостей: `npm install`
3. запуск проекта: `gulp`


Рабочей папкой является `source`.
После запуска проект доступен по адресу `http://localhost:3000`.

Финальная сборка проекта осуществляется командой: `gulp build`
Готовы проект со всеми исходными фаилами хранится в директории `app`.

> Для работы LiveReload, добавьте эту строку перед закрывающим тегом `body`
> `<script src="//localhost:35729/livereload.js"></script>`


