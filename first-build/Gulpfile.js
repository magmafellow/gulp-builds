const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const cssmin = require("gulp-cssmin");
const uglify = require("gulp-uglify");
const beautify = require('gulp-beautify')

function sass2css() {
  return src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(beautify.css({ indent_size: 2 }))
    .pipe(dest("dist/css"))
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist/css/min"));
}

function cleanDist() {
  return src("dist/**/*.*", { read: false }).pipe(clean());
}

function rawJSToProdJS() {
  return src("src/scripts/**/*.js")
    .pipe(dest("dist/js"))
    .pipe(uglify())
    .pipe(dest("dist/js/min"));
}

exports.sass2css = sass2css;
exports.cleanDist = cleanDist;
exports.dojs = rawJSToProdJS;


// watching tasks
exports.dev = function(){
  // watching src styles
  watch('src/sass/**/*.*', sass2css);

  // watching src js
  watch('src/scripts/**/*.*', rawJSToProdJS);

}
