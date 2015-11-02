var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var csslint = require('gulp-csslint');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var reload = browserSync.reload;
var uglify = require('gulp-uglify');

var paths = {
  html: ['index.html'],
  css: ['src/styles/normalize.css', 'src/styles/list_scroll.css'],
  script: ['src/scripts/utils.js', 'src/scripts/list_scroll.js'],
  acceptance: ['spec/list_scroll_spec.js'],
  unit: ['spec/utils_spec.js']
};

gulp.task('browserSyncDev', function() {
  browserSync({
    server: {
      baseDir: "./src/"
    },
    port: 3000,
    open: true,
    notify: false
  });
});

gulp.task('browserSyncDist', function() {
  browserSync({
    server: {
      baseDir: "./dist/"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(reload({stream:true}));
});

gulp.task('mincss', function(){
  return gulp.src(paths.css)
    .pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/styles/'))
    .pipe(reload({stream:true}));
});

gulp.task('minjs', function() {
  return gulp.src(paths.script)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(reload({stream:true}));
});

gulp.task('csslint', function() {
  return gulp.src(paths.css[1])
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(reload({stream:true}));
});

gulp.task('jshint', function() {
  return gulp.src(paths.script)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(reload({stream:true}));
});

gulp.task('acceptance', function () {
  return gulp.src(paths.acceptance)
    .pipe(jasmine({
      integration: true,
      vendor: ['dist/scripts/polyfills.js', 'src/scripts/utils.js', 'src/scripts/list_scroll.js']
    }));
});

gulp.task('unit', function () {
  return gulp.src(paths.unit)
    .pipe(jasmine({
      integration: true,
      vendor: ['dist/scripts/polyfills.js', 'src/scripts/utils.js']
    }));
});

gulp.task('watch',function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['csslint']);
  gulp.watch(paths.script, ['jshint']);
  gulp.watch(paths.acceptance, ['acceptance']);
  gulp.watch(paths.unit, ['unit']);
});

gulp.task('dev', ['watch', 'browserSyncDev']);

gulp.task('default', ['mincss', 'minjs', 'browserSyncDist']);
