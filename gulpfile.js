var gulp = require('gulp')
    , browserify = require('gulp-browserify')
    , uglify     = require('gulp-uglify')
    , rename     = require('gulp-rename')
    , karma      = require('gulp-karma')
    , less       = require('gulp-less')
;

gulp.task('default', function() {
    build(true);
    buildLess(true);
});

gulp.task('js', function() {
    build(true);
});

gulp.task('less', function() {
    buildLess(true);
});

gulp.task('test', function() {
    return gulp.src([ 'build/main.js', 'test/*.js' ])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) { throw err; });
});

gulp.task('deploy', function() {
    build();
    buildLess();
});

gulp.task('watch', function() {
    gulp.watch('lib/*', [ 'js' ]);
    gulp.watch('less/*', [ 'less' ]);
});

function build(withDebugging) {
    return gulp.src('lib/main.js')
        .pipe(browserify({ debug: withDebugging }))
        .pipe(gulp.dest('./build/'))
        .pipe(uglify({ outSourceMap: true }))
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./build/'));
}

function buildLess(withDebugging) {
    return gulp.src('less/app.less')
        .pipe(less({
            compress: true,
            sourceMap: withDebugging
        }))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('./build/'));
}
