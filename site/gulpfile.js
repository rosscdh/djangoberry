'use strict';
// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');
var minify_css = require('gulp-minify-css');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('dist'));
// });

// Concatenate & Minify JS
gulp.task('scripts', function() {
    var opts = {mangle:false};

    return gulp.src(['js/**/*.js'])
        //.pipe(concat('all.js'))
        // // .pipe(gulp.dest('dist'))
        // .pipe(rename('all.min.js'))
        // .pipe(uglify(opts))
        .pipe(gulp.dest('./dist/js/'));
});

// Make the CSS small
gulp.task('minify-css', function() {
  gulp.src(['./css/**/*.css', './js/**/*.css'])
    .pipe(concat('all.css'))
    .pipe(rename('all.min.css'))
    .pipe(minify_css({keepBreaks:true}))
    .pipe(gulp.dest('./dist/css'))
});

// Images
gulp.task('images', function() {
    return gulp.src(['./img/**/*', './js/rs-plugin/assets/**/*', './js/rs-plugin/images/**/*'])
        .pipe(gulp.dest('./dist/img/'));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(['./fonts/**/*', './js/rs-plugin/fonts'])
        .pipe(gulp.dest('./dist/fonts/'));
});

// Replace html values
gulp.task('html-replace', function() {
    var opts = {comments:false,spare:true};
    gulp.src('./index.html')
        .pipe(htmlreplace({
            'css': '/css/all.min.css',
            'js': '/js/all.min.js'
        }))
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['lint', 'scripts']);
    //gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('./css/*.css', ['minify-css']);
    gulp.watch('./*.html', ['html-replace']);
});

// Default Task
gulp.task('default', ['scripts', 'images', 'fonts', 'minify-css', 'html-replace']);