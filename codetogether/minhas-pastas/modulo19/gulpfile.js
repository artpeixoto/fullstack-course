const gulp =        require('gulp');
const gulpCli =     require('gulp-cli');
const gulpRename =  require('gulp-rename');
const gulpCssMin =  require('gulp-cssmin');
const gulpCat  =    require('gulp-concat');
const gulpUglify =  require('gulp-uglify');
const browserSync = require('browser-sync');


function sendCssIGuess(cb){
  
    gulp.src(   importSource + '/**/*.css' )
        .pipe(  gulpCat('libs.css') )
        .pipe(  gulpCssMin()   )
        .pipe(  gulpRename( {suffix: '.min'}  ) )
        .pipe(  gulp.dest(  './dist/css'  ) )
    return cb();
  }

gulp.task('dist-styles', (cb) => {
  return (gulp 
              .src(importSource + '/**/*.js' )
              .pipe(gulpCat('libs.js'))
              .pipe(gulp.dest('./dist/js/')))
  });

gulp.task('serve', (cb) => {
  pastaDeInteresse = "./src";
  serverParams = 
  { server: 
      { baseDir: pastaDeInteresse }
  }
  gulp.watch(pastaDeInteresse+"/**/*").on("change", browserSync.reload); /* talvez n seja mto interessante lidar com o servidor diretamente no gulp? */
  browserSync.init(serverParams);
  }
  );

exports.scripts = tarefasJs;
exports.styles  = sendCssIGuess;
exports.default = gulp.parallel([tarefasJs, sendCssIGuess]);