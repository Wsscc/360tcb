var gulp = require("gulp");
var webserver = require("gulp-webserver");
var livereload = require("gulp-livereload");
var rubySass = require("gulp-ruby-sass");
//自动刷新
gulp.task("reload",function(){
	gulp.src("src")
	.pipe(webserver({
		livereload:true,
		open:true
	}))
})
//scss编译
gulp.task("rubyScss",function(){
	rubySass("src/scss/*.scss",{style:"compressed"})
	.on("error",function(err){
		if(err){
			console.log(err);
		}
	})
	.pipe(gulp.dest("src/scss"));
})