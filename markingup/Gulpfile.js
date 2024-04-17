// Important notice! This gulpbuild does not provide a server. Use five-server in the cli.
//  And You are good to go!

// npm -g rm five-server
// npm -g inst five-server
// five-server (in the dist folder because index.html is in the dist folder)

const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const cssmin = require("gulp-cssmin");
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const beautify = require("gulp-beautify");

function sass2css() {
  const plugins = [autoprefixer(), cssnano()];

  return (
    src("src/sass/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(postcss(plugins[0]))
      .pipe(beautify.css({ indent_size: 4 }))
      .pipe(dest("dist/css"))

      .pipe(postcss(plugins[1]))
      // .pipe(cssmin())

      .pipe(rename({ suffix: ".min" }))
      .pipe(dest("dist/css/min"))
  );
}

function cleanDist() {
  return src("dist/**/*.*", { read: false }).pipe(clean());
}

function rawJSToProdJS() {
  return src("src/scripts/**/*.js")
    .pipe(dest("dist/js"))
    .pipe(uglify())
    .pipe(dest("dist/js/min"))
}

exports.sass2css = sass2css;
exports.cleanDist = cleanDist;
exports.dojs = rawJSToProdJS;

// watching tasks
exports.default = function () {

  // watching src styles
  watch("src/sass/**/*.*", sass2css);

  // watching src js
  watch("src/js/**/*.*", rawJSToProdJS);
};
