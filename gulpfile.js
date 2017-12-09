var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
    gulp
        .src('sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css/'));
});

gulp.task('scripts', function () {
    gulp
        .src(['./www/components/app.js', './www/components/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./www/js'));
});

gulp.task('default', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('www/components/**/*.js', ['scripts']);
});
