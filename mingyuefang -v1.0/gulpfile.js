
//引入gulp
var gulp = require('gulp');
//引入要使用的插件
var requirejsOptimize = require('gulp-requirejs-optimize');
//var gulpMinifyCss= require('gulp-minify-css');
//var gulpMinifyHtml= require('gulp-minify-html');
var gulpNotify= require('gulp-notify');
//var gulpConcat= require('gulp-concat');

/**
 压缩js
 */
gulp.task('controller',function(){
   gulp.src('./js/pageControllers.js')
       .pipe(requirejsOptimize())
           .pipe(gulp.dest('./built/js'));//读取完成，写入
});

//watch 函数
gulp.watch('./js/pageControllers.js',function(event){
   console.log("file: "+event.path+' was '+ event.type+",running tasks...");
});



gulp.task('s',function(){
   gulp.src('./server/*.js')
       .pipe(requirejsOptimize())
       .pipe(gulp.dest('./built/js'))
       .pipe(gulpNotify({ message: 'js task ok' }));//读取完成，写入
});

gulp.task('ss',function(){
   gulp.src('./js/*.js')
       .pipe(requirejsOptimize())
       .pipe(gulp.dest('./built/js'))
       .pipe(gulpNotify({ message: 'js task ok' }));//读取完成，写入
});







