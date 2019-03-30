// grab our gulp packages
var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    runSequence = require('run-sequence'),
    webpack     = require('webpack-stream'),
    browserSync = require('browser-sync').create();



// define the default task and add the watch task to it
gulp.task('default', ['watch']);


// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src('./assets/javascript/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });


gulp.task('build-js', function() {
return gulp.src('./assets/javascript/**/*.js')
    .pipe(webpack({

    }, null, function(err, stats) {
        // console.log(err, stats)
      }))
      .pipe(concat('bundle.js'))
      .pipe(sourcemaps.init({loadMaps: true}))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/javascript'))
    .pipe(browserSync.stream());
});

// configure the build-css task
gulp.task('build-css', function() {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(sass())
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
  });
  

gulp.task('build', function(callback) {
    runSequence('jshint',
                'build-js',
                'build-css',
                'watch',
                callback);
  });
  
  gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


  // configure which files to watch and what tasks to use on file changes
  gulp.task('watch', function() {
    gulp.start(['browser-sync']);
    gulp.watch('./assets/javascript/**/*.js', ['jshint' , 'build-js']);
    gulp.watch('./assets/scss/**/*.scss', ['build-css']);
  });