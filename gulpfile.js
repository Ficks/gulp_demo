const gulp = require('gulp');
const less = require('gulp-less');//解析less
const uglify = require('gulp-uglify');//压缩js
const babel = require('gulp-babel');//编译es6
const html = require('gulp-htmlmin');//压缩html
const imagemin = require('gulp-imagemin');//压缩图片
const autoprefixer = require('gulp-autoprefixer');//自动解析css前缀
const browserSync = require('browser-sync');//自动刷新
const reload = browserSync.reload;//自动刷新

// 解析less
gulp.task('less', function () {
    gulp.src('src/public/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/public/css'));
})
// 解析js
gulp.task('js', function () {
    gulp.src('src/public/scripts/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/public/scripts'));
})
// 解析html
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(html())
        .pipe(gulp.dest('dist/'));
})
// 压缩图片
gulp.task('img', function () {
    gulp.src('src/public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/public/images'));
});

// 自动加css前缀
gulp.task('autoprefixer', function () {
    gulp.src('src/public/css/*.less')
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/public/css'));
});
gulp.task('eventAuto', function () {
    browserSync.stream();
})
//我们还自动监视文件变化，然后执行相应任务
gulp.task("auto", function () {
    browserSync.init({
        server: "./src", //指定网站目录，访问时不需要 
        //输入这个目录(网站根目录就是端口号后面的目录的父级)
        files: ["./src/**/*.*"]
    })
    //    监视指定文件的变化，如果变化就自动执行相应的任务（想监视谁，就在数组里写谁）
})

gulp.task('watch', function () {
    // gulp.watch('src/**/*.*', ['less', 'js'])
    gulp.watch('src/*.html', ['html', 'eventAuto']);
    gulp.watch('src/public/css/*.less', ['less', 'autoprefixer', 'eventAuto']);
    gulp.watch('src/public/scripts/*.js', ['js', 'eventAuto']);
    gulp.watch('src/public/images/*', ['img', 'eventAuto']);
})

// 默认执行
gulp.task('default', ['less', 'js', 'html', 'img', 'autoprefixer', 'auto', 'watch']);