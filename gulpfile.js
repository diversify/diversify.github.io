var gulp =        require('gulp'),
    sass =        require('gulp-sass'),
    minify =      require('gulp-minify-css'),
    handlebars =  require('gulp-compile-handlebars'),
    data =        require('gulp-data'),
    rename =      require('gulp-rename')

gulp.task('template', function() {
  return gulp.src('template.hbs')
        .pipe(data(function() {
          return require('./data.json')
        }))
        .pipe(handlebars())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'))
})

gulp.task('css', function() {
  gulp.src('stylesheets/master.scss')
      .pipe(sass())
      .pipe(minify({ cache: true }))
      .pipe(gulp.dest('./css'))
})

gulp.task('watch', function() {
  gulp.watch('./template.hbs', ['template'])
  gulp.watch('./stylesheets/*.scss', ['css'])
})

gulp.task('default', ['css', 'template'])
