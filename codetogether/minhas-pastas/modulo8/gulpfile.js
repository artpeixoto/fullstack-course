const gulp =        require('gulp');
const browserSync = require('browser-sync');
const sass =        require('gulp-sass')(require('sass'));
const os =          require('os');
const path =        require('path')
const htmlImport =  require('gulp-html-import');
const httpServer =  require('http-server');

const p = {
  //sources are the things i manually code that end up being in the final result
  sources: {
      _path: "./src"
      , htmlRootPages: {
        _path: "/**/*.html" 
      }
      , styles: {
        _path: "style/**/*.scss"
        }
    }
  , build: {
//    procedure: (source, buildProcesses[source]) => {(buildProcesses(source))}
     _path: "./build"
  }
  , use: {
    procedure: (pages, browser) => {browser(pages)} 
    
  }  
}

const sourceDir = p.sources._path;
const styleSourceDir = path.join(sourceDir,  p.sources.styles._path);
const styleBuildDir  = path.join(p.build._path, "style");

function buildHtml(cb){
  return( 
    gulp.src("./src/**/*.html")
        .pipe(htmlImport("src/html/"))
        .pipe(gulp.dest("./build"))
    )
  }

function buildStyles(cb) {
  return (
      gulp.src( "./src/style/scss/**/*.scss")
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest("./build/style/")));
  }

function watchHtml(cb){
    console.log(`watching HTML files from ./src/**/*.html -> ./build`)
    return(
      gulp.watch("./src/*.html").on("change", buildHtml)
    )
  }
function watchStyles(cb){
  console.log(`watching sass files from ./src/style/scss/**/*.scss -> ./build/style/`)
  return (gulp.watch(styleSourceDir).on("change", buildStyles));
  }
function startDebugServer(cb){
  console.log('starting debug Server')
  return gulp.pipe(httpServer());
}

module.exports.buildStyles =  buildStyles
module.exports.buildHtml =    buildHtml
module.exports.watchHtml =    watchHtml;
module.exports.watchStyles =  watchStyles //watching command is a superset of the build command. The difference being quite obvious you silly goof
module.exports.build =        gulp.parallel( buildHtml, buildStyles);
module.exports.watch =        gulp.series(module.exports.build, gulp.parallel( watchHtml, watchStyles));
module.exports.debug  =       gulp.parallel( module.exports.watch, browserSync. )
