const {src, dest,  parallel , series, task, pipe, watch} =  require("gulp");
const path =                                                require('path')
const htmlImport =                                          require('gulp-html-import')
const sass =                                                require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create();

anyScss = "*.scss"
anywhere = "**/"
anyHtml = "*.html"
root = "./"
_src = root + "src/"
src_style = _src + "style/"
src_contents = _src + "contents/"
build = root + "build/"
build_style = build+"style/"

buildSassProc = (srcFile, destDir) =>
{
   console.log(`Building style file:\n\tSource: ${srcFile}\n\tDestination: ${destDir}`);
   src(srcFile)
   .pipe(sass().on("error", sass.logError))
   .pipe(dest(destDir.slice(0,-1)));
}
buildHtmlProc = (srcFile, importsDir, destDir) => {
   console.log(`Building content (HTML) file:\n\tsource: ${srcFile}\n\timports directory: ${importsDir}\n\tDestination: ${destDir}\n`);
   src(srcFile).
   pipe(htmlImport(importsDir)).
   pipe(dest(destDir.slice(0, -1)));
}

getWatcher = (watching, buildFunc) =>{
   let contentsWatcher = watch(watching)
   console.log(`watching: ${watching}`)
   contentsWatcher.on("change", buildFunc)
   return contentsWatcher
} 

getContentsWatcher = () => {
   let srcPat = _src + anyHtml;
   let imports = src_contents;
   let _dest = build;
   watching = [srcPat, imports + anyHtml]
   console.log(`\nInstantiating contents watcher. Arguments:\n\tSource pattern: ${srcPat}\n\tImports dir: ${imports}\n\tDestination: ${_dest}\n`);
   return  getWatcher(watching, () => buildHtmlProc(srcPat, imports, _dest)) 
}
getStylesWatcher = () => {
   let srcPat = src_style + anyScss;
   let _dest = build_style;
   let watching = [srcPat]
   console.log(`Instantiating styles watcher. Arguments:\n\tSource pattern: ${srcPat}\n\tDestination: ${_dest}\n`);
   return  getWatcher(watching, () => buildSassProc(srcPat,_dest )) 
}

module.exports.startServer =   parallel(() => {browserSync.init({server:{baseDir:"./build"}})}, () => {watch([build + "**"]).on("change", browserSync.reload)})
module.exports.watchContents = getContentsWatcher;
module.exports.watchContents.displayName = 'watch:contents'
module.exports.watchContents.description = "will instantiate a watcher and builder for the contents(html) files"
module.exports.watchStyles =   getStylesWatcher;
module.exports.watchStyles.displayName = 'watch:styles'
module.exports.watchStyles.description = "will instantiate a watcher and builder for the styles files"
module.exports.watch = parallel(module.exports.watchStyles, module.exports.watchContents) 