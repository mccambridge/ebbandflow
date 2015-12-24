const gulp 			= require('gulp');
const sourcemaps 	= require('gulp-sourcemaps');
const babel 		= require('gulp-babel');
const concat 		= require('gulp-concat');
const uglify 		= require('gulp-uglify');
const rename 		= require('gulp-rename')

const postcss		= require('gulp-postcss');
const precss 		= require('precss');
const autoprefixer  = require('autoprefixer');
 
gulp.task('scripts', () => {
	return gulp.src('src/scripts/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('scripts.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});

gulp.task('styles', () => {
	const processors = [
		precss(),
		autoprefixer({browsers: ['last 2 versions']})
	];
	return gulp.src('src/styles/styles.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('dist'))
});
