const gulp =    require('gulp');
const gulpCli = require('gulp-cli');

function sendCssIGuess(cb){
  return (
    gulp.src('.vendor/**/*.css')
    .pipe(gulp.dest('./dist'))
    );
}
module.exports.style = sendCssIGuess
