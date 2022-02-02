const gulp =        require('gulp');
const browserSync = require('browser-sync');
const sass =        require('gulp-sass')(require('sass'));
const os =          require('os');
const path =        require('path')
const htmlImport =  require('gulp-html-import');
const httpServer =  require('http-server');
const Json =        JSON;

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

const sourceDir = './src'
const buildDir  = './build'
const stylesSourceDir = path.join(sourceDir,      'style');
const styleBuildDir  = path.join(buildDir,   "style");
const htmlSourceDir  =  sourceDir;
const htmlSourceComponentsDir = path.join(htmlSourceDir, "html/")
const htmlSourceCompPatt = htmlSourceComponentsDir + "*.html"



patterns = {
  style: path.join(stylesSourceDir, "**.scss")
  , html: path.join(htmlSourceDir, "*.html")
  };


function buildHtml(cb){
  srcPattern = patterns.html;
  destDir    = "./build/"
  
  console.log(`Building contents:\t${srcPattern} ->\t${destDir}\n...`)
  
  gulp.src(srcPattern)
      .pipe(htmlImport(htmlSourceComponentsDir))
      .pipe(gulp.dest(destDir))
  }


function buildStyles(cb) {
  srcPattern = patterns.style;
  destDir    = "./build/style/"
  
  console.log(`Building styles:\t${srcPattern} ->\t${destDir}`)
  
  gulp.src( patterns.style ) 
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./build/style/"));
  }


function watchSource() {
  watched = {
    style: [patterns.style]
    , html: [patterns.html, htmlSourceCompPatt]
  } 
  console.log(`Watching:\n\t${Json.stringify(watched)}`);
  watchers = 
    { style: gulp.watch(watched.style)
    , html:  gulp.watch(watched.html) }

  watchers.style.on("change", (path, stats) => {
    console.log(`detected the changes in the file: ${path} ${Json.stringify(stats)}`)
    buildStyles();
  });

  watchers.html.on("change", (path, stats) => {
    console.log(`detected the changes in the file: ${path} ${Json.stringify(stats)}`)
    buildHtml();
  });
}

function startDebugServer(cb){
  console.log('starting debug Server')
  gulp.pipe(httpServer());
}
module.exports.watch =        watchSource;
module.exports.buildStyles =  buildStyles
module.exports.buildHtml =    buildHtml
module.exports.build =        gulp.series( buildHtml, buildStyles);
