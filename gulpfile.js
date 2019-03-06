var gulp = require('gulp');
// 压缩html
//gulp插件应用 下载插件》取到插件》应用插件
var htmlClean = require("gulp-htmlclean");//压缩html
var imageMin = require("gulp-imagemin");//压缩图片
var uglify = require("gulp-uglify");//压缩js插件
var debug = require("gulp-strip-debug");//去掉调试语句
var less = require("gulp-less")//less转换成css
var cleanCss = require("gulp-clean-css");//压缩css
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var connect = require("gulp-connect");
var folder = {
    src: "src/",
    dist: "dist/"
}
// 判断当前环境变量
var devMoa=process.env.NODE_ENV=="development";
// export NODE_ENV=development  设置环境变量


console.log(devMoa);
gulp.task("html", function () {
    return gulp.src(folder.src + "html/*")
        .pipe(connect.reload())//更新
        .pipe(htmlClean())
        .pipe(gulp.dest(folder.dist + "html/"))
})
gulp.task("css", function () {
    return gulp.src(folder.src + "css/*")
        .pipe(connect.reload())//更新
        .pipe(less())
        .pipe(postcss([autoprefixer]))
        .pipe(cleanCss())
        .pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("images", function () {
    return gulp.src(folder.src + "images/*")
        .pipe(connect.reload())//更新
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "images/"))
})
gulp.task("js", function () {
    var page= gulp.src(folder.src + "js/*")
        .pipe(connect.reload());//更新
        if(!devMoa){
            return page.pipe(uglify()).pipe(debug()).pipe(gulp.dest(folder.dist + "js/"))
        }
        return page.pipe(gulp.dest(folder.dist + "js/"))
})
gulp.task("server",function(){
    connect.server({
        port:"9999",//端口
        livereload:true,//自动更新
    })
})
// 监听文件变化
gulp.task("watch",function(){
    gulp.watch(folder.src+"html/*",gulp.series('html'))
    gulp.watch(folder.src+"css/*",gulp.series('css'))
    gulp.watch(folder.src+"js/*",gulp.series('js'))
})
gulp.task("default", gulp.series(gulp.parallel("server","watch","html", "css", "js", "images")));
//gulp.src()
//gulp.dest()
//gulp.task()
// gulp.watch()