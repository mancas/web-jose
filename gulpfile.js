const gulp = require('gulp');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');

const runSequence = require('run-sequence');

gulp.task('main', (cb) => {
  gulp.src('public/css/app.styl')
    .pipe(stylus({compress: true, 'include css': true}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'))
    .on('end', cb)
});

gulp.task('admin', (cb) => {
  gulp.src('public/css/admin/admin.styl')
    .pipe(stylus({compress: true, 'include css': true}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css/admin'))
    .on('end', cb)
});

gulp.task('watch', () => {
  gulp.watch('public/css/**', ['admin', 'main'])
});

gulp.task('default', (cb) => { runSequence(['main', 'admin', 'watch'], cb) });
