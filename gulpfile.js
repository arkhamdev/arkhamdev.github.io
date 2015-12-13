var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');

gulp.task('styles', function() {
    return gulp.src('sass/*.scss')
        .pipe(plumber())
        .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(minifyCss())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', ['styles'], function() {
    browserSync({
        notify: false,
        server: {
            baseDir: './'
        }
    });

    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
