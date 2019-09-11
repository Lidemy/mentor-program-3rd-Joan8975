/* eslint-disable */
const gulp = require('gulp');
const uglify = require('gulp-uglify'); // node-moduls 裡面撈 npm 進去的 'gulp-uglify'
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const babel = require('gulp-babel');

// sass + compressed
gulp.task('sass', () => {
  return gulp.src('source/sass/style.sass')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});
// gulp.task('sass:watch', function () {
//   return gulp.watch('sass/*.sass', gulp.series('sass'));
// });

// babel
gulp.task('babel', () =>
  gulp.src('source/js/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(gulp.dest('build/js')),
);

// Uglifies
gulp.task('scripts', () => {
  return gulp.src('build/js/*.js') // * 代表在 js 資料夾底下的所有 js 檔案都會被執行
    .pipe(uglify()) // 執行 uglify
    .pipe(gulp.dest('build/js'));// 執行完成後設定 destination
});

gulp.task('default', gulp.series('sass', 'babel', 'scripts'));
