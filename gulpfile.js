const gulp 			     = require('gulp');
const webpack        = require('gulp-webpack');
const sourcemaps     = require('gulp-sourcemaps');
const babel 		     = require('gulp-babel');
const concat 		     = require('gulp-concat');
const uglify 		     = require('gulp-uglify');
const rename 		     = require('gulp-rename')

const postcss		     = require('gulp-postcss');
const precss 		     = require('precss');
const postcssfocus   = require('postcss-focus')
const autoprefixer   = require('autoprefixer');
// const mqpacker       = require('css-mqpacker');
const csswring       = require('csswring');
const lost			     = require('lost');

const njRender		   = require('gulp-nunjucks-render');
const nj 			       = njRender.nunjucks;

const gm             = require('gulp-gm');
const parallel       = require('concurrent-transform');
const os             = require('os');

const browserSync 	 = require('browser-sync');
const reload      	 = browserSync.reload;
 
gulp.task('scripts', () => {
	return gulp.src('src/scripts/app.js')
    .pipe(webpack())
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
    .pipe(rename('app.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream:true}));
});

gulp.task('vendor', () => {
  return gulp.src('src/scripts/vendor/**/*.js')
    .pipe(gulp.dest('dist/vendor'));
});

gulp.task('htaccess', () => {
  return gulp.src('src/.htaccess')
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', () => {
	const processors = [
		precss(),
    postcssfocus,
		lost,
		autoprefixer({browsers: ['last 2 versions']}),
    // mqpacker,
    csswring
	];
	return gulp.src('src/styles/styles.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('dist'))
});

gulp.task('markup', () => {
	nj.configure(['src/templates'], {watch: false});
	return gulp.src('src/html/**/*.+(html|nj|nunjucks)')
		.pipe(njRender())
		.pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('src/media/layout/**/*.+(gif|jpg|png|svg)')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('locations', () => {
  gulp.src('src/media/locations/**/*')
    .pipe(parallel(
        gm((tmp) => tmp.resize(900).quality(60)),
        os.cpus().length
      ))
      .pipe(gulp.dest('dist/images/locations'));
});

gulp.task('watch', () => {
	gulp.watch('src/templates/**/*.+(html|nj|nunjucks)', ['markup', reload]);
	gulp.watch('src/html/**/*.+(html|nj|nunjucks)', ['markup', reload]);
	gulp.watch('src/styles/**/*.css', ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', 'vendor', reload]);
	gulp.watch(['src/fonts/**/*'], ['fonts', reload]);
  gulp.watch(['src/media/layout/**/*.+(gif|jpg|png|svg)'], ['images', reload]);
	gulp.watch("*.html", reload);
  gulp.watch(".htaccess", ['htaccess', reload]);
});

gulp.task('sync', () => {
	browserSync({
		server: {
			baseDir: "./dist/"
		}
	});
});

gulp.task('server', ['markup', 'styles', 'fonts', 'images', 'sync', 'scripts', 'vendor', 'htaccess', 'watch']);

gulp.task('default', ['markup', 'styles', 'fonts', 'images', 'scripts', 'vendor', 'htacces']);
