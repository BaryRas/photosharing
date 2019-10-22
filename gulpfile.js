/*jshint esversion: 8 */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

function sassCss() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
}

function moveJs() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
}

function moveFonts() {
    return gulp.src(['node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('src/fonts'))
        .pipe(browserSync.stream());
}

//run sass when serve runs
//run server
//watch for any changes in src/scss folder and reload the browser
//also watch for sass changes
// //watch for html changes
function launchServer() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index: "index.html"
        }
    });
    gulp.watch('node_modules/bootstrap/scss/bootstrap.scss', sassCss);
    gulp.watch('node_modules/font-awesome/scss/font-awesome.scss', sassCss);
    gulp.watch('src/scss/*.scss', sassCss);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/css/*.css").on('change', browserSync.reload);

}

// //run gulp
// //launch server and browser
// //execute js task
gulp.task("sassCss", sassCss);
gulp.task("moveJs", moveJs);
gulp.task("moveFonts", moveFonts);

gulp.task('default', gulp.series(sassCss, moveJs, moveFonts, launchServer));

