"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include"); // для вставки повторяющихся кусков разметки

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css/"))
    .pipe(server.stream());
});

gulp.task('html', function () {
  return gulp.src([
    'source/*.html'])
    .pipe(plumber())
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build/"))
    .pipe(server.stream());
});

gulp.task("images", function () {
 return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
     imagemin.optipng({optimizationLevel: 3}),
     imagemin.mozjpeg({quality: 75, progressive: true})

    ]))
  .pipe(gulp.dest("build/img/")); // после оптимизации нужно положить файлы в...
});

gulp.task("sprite", function () {
return gulp.src("source/img/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("source/img"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "html", "images", "server"));
