var gulp = require('gulp')
    , browserify = require('gulp-browserify')
    , uglify     = require('gulp-uglify')
    , rename     = require('gulp-rename')
    , karma      = require('gulp-karma')
    , less       = require('gulp-less')
    , jade       = require('gulp-jade')
    , gutil      = require('gulp-util')
;

var paths = {
    dev: './build/dev',
    prod: './build/prod'
};

gulp.task('default', function() {
    build(true);
    buildLess(true);
    buildJade(true);
    buildTests();
});

gulp.task('js', function() {
    build(true);
    buildTests();
});

gulp.task('less', function() {
    buildLess(true);
});

gulp.task('jade', function() {
    buildJade(true);
})

gulp.task('test', function() {
    buildTests();
    return gulp.src([ 'build/dev/main.js', 'build/test/*.js' ])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', log)
});

gulp.task('deploy', function() {
    build();
    buildLess();
    buildJade();
});

gulp.task('watch', function() {
    gulp.watch([ 'lib/*', 'test/*' ], [ 'js' ]);
    gulp.watch('less/*', [ 'less' ]);
    gulp.watch('templates/*', [ 'jade' ]);
});

function build(withDebugging) {
    var dest = withDebugging ? paths.dev : paths.prod;
    var app = gulp.src('lib/main.js')
        .pipe(browserify({ debug: withDebugging }))
        .on('error', gutil.noop)

    return withDebugging
        ? app.pipe(gulp.dest(dest))
        : app.pipe(uglify({ outSourceMap: true }))
            .pipe(rename('main.min.js'))
            .pipe(gulp.dest(dest))
    ;
}

function buildTests() {
    return gulp.src('test/*')
        .pipe(browserify())
        .on('error', log)
        .pipe(gulp.dest('./build/test'));
}

function buildLess(withDebugging) {
    var dest = withDebugging ? paths.dev : paths.prod;
    var name = withDebugging ? 'styles.css' : 'styles.min.css';
    return gulp.src('less/app.less')
        .pipe(less({
            compress: !withDebugging,
            sourceMap: withDebugging
        }))
        .on('error', log)
        .pipe(rename(name))
        .pipe(gulp.dest(dest));
}

function buildJade(withDebugging) {
    var dest = withDebugging ? paths.dev : paths.prod;
    var options = {
        pretty: withDebugging,
        locals: {
            inDev: withDebugging
        }
    };
    return gulp.src('templates/*')
        .pipe(jade(options))
        .on('error', log)
        .pipe(gulp.dest(dest));
}

function log(err) {
    gutil.log(
        err.stack || err.message,
        '\n',
        gutil.colors.magenta(err.path)
    );
}
