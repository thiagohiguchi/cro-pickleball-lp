const { src, dest, series, parallel, watch } = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const minify = require("gulp-minify-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const logger = require("gulp-logger");
const gulpif = require("gulp-if");
const browserSync = require("browser-sync").create();
const path = require("path");

// Environment variables
const isProduction = process.env.NODE_ENV === "production";
const _gParams = {
  FILE_PREFIX: isProduction ? "/cro-pickleball-lp/" : "",
  IMG_PREFIX_URL: isProduction ? "cro-pickleball-lp/" : "",
};

// Paths
const paths = {
  src: "src",
  dist: "dist",
  nunjucks: "src/templates/**.njk",
  sass: "src/sass/**/*.scss",
  js: "src/js/**/*.js",
  images: "src/images/**/*.{jpg,jpeg,png,gif,svg}",
  assets: "src/assets/**/*",
};

// Generate a random number and round it
const hashValue = Math.floor(Math.random() * 1000) + 1000;

// Clean the output directory
function cleanDist() {
  return src(paths.dist, { allowEmpty: true, read: false }).pipe(clean());
}

// Compile Nunjucks templates into HTML
function compileNunjucks() {
  return src(paths.nunjucks)
    .pipe(
      data(() => _gParams) // Pass environment variables
    )
    .pipe(
      nunjucksRender({
        data: { hash: hashValue },
        path: ["src/templates"], // Set the base directory for includes
      })
    )
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

// Compile Sass files into CSS
function compileSass() {
  return src(paths.sass)
    .pipe(
      sass({
        loadPaths: ["./src/sass"],
        outputStyle: "compressed",
        indentWidth: 0,
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer("last 2 version"))
    .pipe(minify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(`${paths.dist}/css`, { overwrite: true }))
    .pipe(browserSync.stream());
}

// Transpile and minify JavaScript
function compileJs() {
  return src(paths.js)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulpif(isProduction, uglify()))
    .pipe(dest(`${paths.dist}/js`))
    .pipe(browserSync.stream());
}

// Optimize images
function optimizeImages() {
  return src(paths.images, { encoding: false })
    .pipe(
      gulpif(
        isProduction,
        logger({
          before: "Optimizing images, it might take a while...",
          showChange: false,
        })
      )
    )
    .pipe(
      gulpif(
        isProduction,
        imagemin([
          imagemin.mozjpeg({ quality: 85, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo(),
        ])
      )
    )
    .pipe(dest(`${paths.dist}/images`));
}

// Copy static assets
function copyAssets() {
  return src(paths.assets, { encoding: false }).pipe(
    dest(`${paths.dist}/assets`)
  );
}

// Watch files for changes
function devWatch() {
  browserSync.init({
    server: {
      baseDir: paths.dist,
    },
    port: 9000,
  });

  watch(paths.nunjucks, compileNunjucks);
  watch(paths.sass, compileSass);
  watch(paths.js, compileJs);
  watch(paths.images, optimizeImages);
  watch(paths.assets, copyAssets);
}

// Build task
const build = series(
  cleanDist,
  parallel(compileNunjucks, compileSass, compileJs, optimizeImages, copyAssets)
);

// Default task
exports.default = build;
exports.build = build;

// Dev task with watch
exports.dev = series(build, devWatch);
