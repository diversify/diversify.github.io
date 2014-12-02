var gulp =        require('gulp'),
    sass =        require('gulp-sass'),
    minify =      require('gulp-minify-css'),
    handlebars =  require('gulp-compile-handlebars'),
    data =        require('gulp-data'),
    rename =      require('gulp-rename'),
    fs =          require('fs'),
    prefixer =    require('gulp-autoprefixer')

gulp.task('template', function() {
  var options = {
    helpers: require('./lib/helpers')
  }

  var file = fs.readFileSync('./data.json', 'utf8')
  var templateData = JSON.parse(file)

  return gulp.src('template.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'))
})

gulp.task('css', function() {
  gulp.src('stylesheets/master.scss')
      .pipe(sass())
      .pipe(prefixer())
      .pipe(minify({ cache: true }))
      .pipe(gulp.dest('./css'))
})

gulp.task('watch', function() {
  gulp.watch('./template.hbs', ['template'])
  gulp.watch('./stylesheets/*.scss', ['css'])
})

gulp.task('default', ['css', 'template'])
