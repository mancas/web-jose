const gulp = require('gulp');
const stylus = require('gulp-stylus')
const cleanCSS = require('gulp-clean-css')

const runSequence = require('run-sequence')

gulp.task('stylus', (cb) => {
  gulp.src('public/css/app.styl')
    .pipe(stylus({compress: true, 'include css': true}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'))
    .on('end', cb)
})

gulp.task('watch', () => {
  gulp.watch('public/css/**', ['stylus'])
})

gulp.task('default', (cb) => { runSequence(['stylus', 'watch'], cb) })
