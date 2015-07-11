'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;

// Build for production
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', ['jshint', 'html', 'images', 'copy', 'make-404'], cb);
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});


// Scan html for assets - clean, concat, minify
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/**/*.html')
    .pipe(assets)
    // Concat & minify js
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Remove Any Unused css
    .pipe($.if('*.css', $.uncss({
      html: [
        'app/**/*.html'
      ]
    })))
    // Concat & minify css
    // useref build blocks
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml()))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Copy root level files from `app` to `dist`
gulp.task('copy', function () {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});

// Duplicate index.html as 404.html for angular HTML5 mode on GitHub pages
gulp.task('make-404', ['html'], function () {
  return gulp.src('dist/index.html')
    .pipe($.rename('404.html'))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'make-404'}));
});

gulp.task('styles', function () {
  var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
      'app/styles/main.scss'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        precision: 10,
        onError: console.error.bind(console, 'Sass error:')
      }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size({title: 'styles'}));
});

// Clean the build directories
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Watch for changes & reload
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    server: {
      baseDir: ['.tmp', 'app'],
      //serve index.html for all routes without file extensions (sim for HTML 5 mode)
      middleware: [
        function (req, res, next) {
          if (req.url.indexOf('.') > -1) {
            return next();
          } else {
            require('fs').createReadStream('app/index.html').pipe(res);
          }
        }
      ]
    }
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    server: {
      baseDir: 'dist',
      //sim HTML5 mode with GitHub pages 404 routing
      middleware: [
        function (req, res, next) {
          if (req.url.indexOf('.') > -1) {
            return next();
          } else {
            require('fs').createReadStream('dist/404.html').pipe(res);
          }
        }
      ]
    }
  });
});

gulp.task('pagespeed', pagespeed.bind(null, {
  url: 'http://bitprice.io',
  strategy: 'mobile'
}));

// Load custom tasks from the `tasks` directory
var tasks;
try {
  tasks = require('require-dir')('tasks');
} catch (err) {
  console.error(err);
}
