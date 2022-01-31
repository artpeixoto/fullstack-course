const gulp =        require('gulp');
const gulpCli =     require('gulp-cli');
const gulpRename =  require('gulp-rename');
const gulpCssMin =  require('gulp-cssmin');
const gulpCat  =    require('gulp-concat');
const gulpUglify =  require('gulp-uglify')
const importSource = './node_modules'
function sendCssIGuess(cb){
  return (
    gulp.src(   importSource + '/**/*.css' )
        .pipe(  gulpCat('libs.css') )
        .pipe(  gulpCssMin()   )
        .pipe(  gulpRename( {suffix: '.min'}  ) )
        .pipe(  gulp.dest(  './dist/css'  ) )
    );
  }

function tarefasJs(cb) {
  return (gulp 
              .src(importSource + '/**/*.js' )
              .pipe(gulpCat('libs.js'))
              .pipe(gulp.dest('./dist/js/')))
  }
exports.scripts = tarefasJs;
exports.styles  = sendCssIGuess;