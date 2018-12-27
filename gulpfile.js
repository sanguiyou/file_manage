var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    // sass = require('gulp-ruby-sass'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();
    fileinclude = require('gulp-file-include');

gulp.task('file-include', function() {
    gulp.src(['src/html/*.html'])//主文件
        .pipe(fileinclude({
            prefix: '@@',//变量前缀 @@include
            basepath: 'src/html/include',//引用文件路径
            indent:true//保留文件的缩进
        }))
        .pipe(gulp.dest('production/department/'));//输出目录路径
});

var DEST = 'build/';

//./node_modules/gulp/bin/gulp.js file-include

gulp.task('scripts-common', function() {
    return gulp.src([
        'src/js/common/helpers/*.js',
        'src/js/common/*.js',
      ])
      .pipe(concat('custom.js'))      
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(rename({suffix: '.min'}))
      //.pipe(uglify())
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(browserSync.stream());
});

gulp.task('scripts-page', function() {
    return gulp.src([
        'src/js/page/*.js',
    ])
        .pipe(gulp.dest(DEST+'/js'))
        .pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        .pipe(gulp.dest(DEST+'/js'))
        .pipe(browserSync.stream());
});

// TODO: Maybe we can simplify how sass compile the minify and unminify version
sass.compiler = require('node-sass');
var compileSASSCommon = function (filename, options, path) {
  return gulp.src(path, options)
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        .pipe(concat(filename))
        .pipe(gulp.dest(DEST+'/css'))
        .pipe(browserSync.stream());
};
var compileSASSPage = function (options, path) {
    console.log("compileSASSPage");
    return gulp.src(path, options)
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        .pipe(gulp.dest(DEST+'/css'))
        .pipe(browserSync.stream());
};

gulp.task('sass-common', function() {
    return compileSASSCommon('custom.css', {}, 'src/scss/common/*.scss');
});

gulp.task('sass-common-minify', function() {
    return compileSASSCommon('custom.min.css', {style: 'compressed'}, 'src/scss/common/*.scss');
});

gulp.task('sass-page', function() {
    return compileSASSPage({}, 'src/scss/page/*.scss');
});

gulp.task('sass-page-minify', function() {
    return compileSASSPage({style: 'compressed'}, 'src/scss/page/*.scss');
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './production/index.html'
    });
});

gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('production/*.html', browserSync.reload);
  gulp.watch('production/reportManager/*.html', browserSync.reload);
  gulp.watch('production/designInstituteManager/*.html', browserSync.reload);
  gulp.watch('production/department/*.html', browserSync.reload);
  gulp.watch('production/agent/*.html', browserSync.reload);
  gulp.watch('production/noticeHonor/*.html', browserSync.reload);
  gulp.watch('production/product/*.html', browserSync.reload);
  gulp.watch('production/message/*.html', browserSync.reload);
  gulp.watch('production/statistic/*.html', browserSync.reload);
  gulp.watch('production/contractPerformance/*.html', browserSync.reload);
  // Watch .js files
  gulp.watch('src/js/common/*.js', ['scripts-common']);
  gulp.watch('src/js/page/*.js', ['scripts-page']);

  gulp.watch('src/html/*.html', ['file-include']);
  gulp.watch('src/html/include/*.html', ['file-include']);
  

  // Watch .scss files
  gulp.watch('src/scss/common/*.scss', ['sass-common', 'sass-common-minify']);
  gulp.watch('src/scss/page/*.scss', ['sass-page', 'sass-page-minify']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch']);