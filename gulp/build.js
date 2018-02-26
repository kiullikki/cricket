'use strict';

// initialize plugins
var gulp = require('gulp'), // Сообственно Gulp JS
    sass = require('gulp-sass'), // Плагин для sass
    csso = require('gulp-csso'), // Минификация CSS
    imagemin = require('gulp-imagemin'), // Минификация изображений
    autoprefixer = require('gulp-autoprefixer'), // автопрефиксер
    suorcemap = require('gulp-sourcemaps'), // Увидеть sass
    pug = require('gulp-pug'), // pug
    sync = require('browser-sync').create(), // Автообновление страницы
    babel = require('gulp-babel'),
    path = require('path'); // библиотека для работы с директориями

//for svg

var svgSprite = require('gulp-svg-sprites'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

var paths = require('./config');

// collect html
gulp.task('html', ()=>{
    return gulp.src(paths.path.pages)
        .pipe(gulp.dest(paths.path.dist))
});

// collect sass
gulp.task('sass', function() {
   return gulp.src(paths.path.sass)
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: 'false',
            browsers: ['last 50 versions']
        }))
        .pipe(csso())
        .pipe(gulp.dest(paths.path.dist))
});

// copyed pictures
gulp.task('img', function() {
   return gulp.src(paths.path.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.join(paths.path.dist, '/img')))
});

// collect svg
gulp.task('svg', function() {
   return gulp.src(paths.path.svg)
       .pipe(svgmin({
           js2svg: {
               pretty:true
           }
       }))
       .pipe(cheerio({
           run: function ($) {
               $('*[fill]').removeAttr('fill');
               $('*[style]').removeAttr('style');
               $('style').remove();
               parserOptions: { xmlMode: true }
           }
       }))
       .pipe(replace('&gt;', '>'))
       .pipe(svgSprite({
           mode: 'symbols',
           preview: false,
           selector: 'icon-%f',
           svg: {
               symbols: 'svg.html'
           }
       }))
       .pipe(gulp.dest(path.join(paths.path.templates, '/pages')));
});

//js

gulp.task('js', () => {
    return gulp.src(paths.path.js)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(paths.path.dist));
});

gulp.task('build', ['html', 'sass', 'img', 'svg'], function () {});