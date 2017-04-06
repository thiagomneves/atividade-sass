const gulp 		= require("gulp");
const sass 		= require("gulp-sass");
var htmlclean = require('gulp-htmlclean');
const notify 	= require("gulp-notify");

/*

  Task responsável por recuperar todos arquivos no formato .scss e .sass
  e retornar para pasta css que será criada automaticamente.

*/

gulp.task("sass", function(){
	return gulp.src('./source/scss/style.scss')
			.pipe(sass())
			.on("error", notify.onError({title:"erro ao compilar", message:"<%= error.message %>"}))
			.pipe(gulp.dest("./dist/css"))
});

gulp.task('html',function(){
	return gulp.src('./source/index.html')
	.pipe(htmlclean({
		protect: /<\!--%fooTemplate\b.*?%-->/g,
		edit: function(html) {
			return html.replace(/\begg(s?)\b/ig, 'omelet$1');}
		}))
	.pipe(gulp.dest('./dist/'));
});

gulp.task("sass:watch", function(){
	gulp.watch("./source/scss/**/*.scss", ['sass']);
});

gulp.task("html:watch", function(){
	gulp.watch("./source/*.html", ['html']);
});

gulp.task("default",['sass', 'sass:watch', 'html', 'html:watch']);