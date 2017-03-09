var gulp = require('gulp');
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');
var sass = require("gulp-sass");

gulp.task('sass', function(){
	return gulp.src('css/*.scss')
	.pipe(sass({outputStyle: 'expanded'})).pipe(rename('style.css'))
	.pipe(gulp.dest('css/'));
});


gulp.task("watch", function(){ 
	gulp.watch("css/*.scss", ['sass']);
});


gulp.task('webserver', function(){
	return gulp.src("./")
	.pipe(webserver({
		port: "4000",
		livereload: true,
		open: true
	}));
});

// gulp.task('default', ['sass', 'watch', 'webserver']);
 gulp.task('default', ['webserver']);