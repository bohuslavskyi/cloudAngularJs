var gulp       = require('gulp');
var sass       = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename')

var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('ng-styles', function() {
    return gulp
        .src('admin/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('admin/css'))
        .pipe(reload({ stream: true }));
});

gulp.task('serve', function() {
    browserSync({
        server: { baseDir: 'admin' },
        online: false,
        scriptPath: function (path, port, options) {
            return options.get('absolute');
        },
        snippetOptions: {
            rule: { match: /<\/head>/i }
        }
    });
});



// gulp.task('conc1', function() {
//     return gulp.src(['admin/js/source/console/**/*.js'])
//         .pipe(concat('app.js'))
//         .pipe(gulp.dest('admin/dist/js'));
// });
//
// gulp.task('conc2', function() {
//     return gulp.src(['admin/js/source/common/commonModule.js', 'admin/js/source/common/services/*.js', 'admin/js/source/common/filters/*.js', 'admin/js/source/common/directives/*.js'])
//         .pipe(concat('common.js'))
//         .pipe(gulp.dest('admin/dist/js'));
// });
//
// gulp.task('minify', function () {
//     gulp.src('admin/dist/js/*.js')
//         .pipe(uglify({ mangle: false }))
//         .pipe(gulp.dest('admin/dist'));
// });


// gulp.task('mincss1', function () {
//     gulp.src('admin/css/*.css')
//         .pipe(cssmin())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('admin/css'));
// });
//
// gulp.task('mincss2', function () {
//     gulp.src('admin/css/**/*.css')
//         .pipe(cssmin())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('admin/css'));
// });

gulp.task('dev', ['ng-styles', 'serve'], function() {
    gulp.watch('admin/js/source/*.{html,js,json}', [reload]);
    gulp.watch('admin/js/source/**/*.{html,js,json}', [reload]);
    gulp.watch('admin/languages/*.{html,js,json}', [reload]);
    gulp.watch('admin/templates/**/*.{html,js,json}', [reload]);
    gulp.watch('admin/scss/*', ['ng-styles']);
    gulp.watch('admin/scss/**/*', ['ng-styles']);
});

