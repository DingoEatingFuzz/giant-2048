var gulp = require('gulp')
    , browserify = require('gulp-browserify')
    , uglify     = require('gulp-uglify')
    , rename     = require('gulp-rename')
    , karma      = require('gulp-karma')
;

gulp.task('default', function() {
    // build things & watch things
    return build();
});

gulp.task('test', function() {
    // run karma
    return gulp.src([ 'build/main.js', 'test/*.js' ])
	.pipe(karma({
	    configFile: 'karma.conf.js',
	    action: 'run'
	}))
	.on('error', function(err) { throw err; });
});

gulp.task('deploy', function() {
    // build and minify things
    return build()
	.pipe(uglify({ outSourceMap: true }))
	.pipe(rename('main.min.js'))
	.pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
    gulp.watch('lib/*', [ 'default' ]);
});

function build() {
    return gulp.src('lib/main.js')
	.pipe(browserify({ debug: true }))
	.pipe(gulp.dest('./build/'));
}
