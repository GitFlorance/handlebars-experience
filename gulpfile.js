const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const cssMinify = require('gulp-csso');
const del = require('del');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const debug = require('gulp-debug');
const webpack = require('webpack');
const webpackconfig = require('./webpack.config.js');
const webpackstream = require('webpack-stream');
const data = require('gulp-data');
const hb = require('gulp-hb');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const prettyHtml = require('gulp-pretty-html');
const gulpSquoosh = require("gulp-squoosh");
const gulpCache = require("gulp-cache");
const ftp = require('vinyl-ftp');

const fs = require('fs');
const path = require('path');

gulp.task('sprite', function() {
    return gulp
        .src('src/img/icons/*.svg')
        .pipe(plumber())
        .pipe(
            svgSprite({
                mode: {
                    inline: true,
                    symbol: {
                        sprite: '../sprite.hbs'
                    }
                },
                transform: [
                    {svgo: {
                        plugins: [
                            { removeViewBox: false },
                            { removeUselessStrokeAndFill: false },
                            { cleanupIDs: false },
                            { mergePaths: false },
                            { removeUnknownsAndDefaults: false }
                        ]
                    }}
                ],
                svg: {
                    xmlDeclaration: false,
                    doctypeDeclaration: false,
                    namespaceIDs: false
                }
            })
        )
        .pipe(gulp.dest('./src/partials/components'));
});

gulp.task('handlebars', function() {
    return gulp
        .src('./src/pages/**/*.hbs')
        .pipe(debug({ title: 'handlebars compiler:' }))
        .pipe(
            data(function(file) {
                try {
                    const data = JSON.parse(fs.readFileSync('./src/pages/data/' + path.basename(file.path).replace('.hbs', '.json')));
                    return data;
                } catch (err) {
                    return null;
                }
            })
        )
        .pipe(
            hb()
                .partials('./src/partials/components/**/*.hbs')
                .partials('./src/partials/layouts/**/*.hbs')
                .helpers(require('handlebars-layouts'))
        )
        .pipe(
            rename(function(path) {
                path.extname = '.html';
            })
        )
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return gulp
        .src('src/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())

        .pipe(gulp.dest('build/css'))
        .pipe(cssMinify())
        .pipe(rename('styles.min.css'))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('build/css'))

        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp
        .src('./src/js/**/*')
        .pipe(plumber())
        .pipe(webpackstream(webpackconfig, webpack))
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts-production', function() {
    return gulp
        .src('./src/js/**/*')
        .pipe(plumber())
        .pipe(webpackstream({ ...webpackconfig, mode: 'production', devtool: 'source-map' }, webpack))
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function() {
    return del('./build');
});

gulp.task('serve', function() {
    browserSync.init({
        server: 'build/',
        port: 7000,
        ghostMode: false
    });
    gulp.watch(['./src/**/*.hbs', './src/pages/data**/*.json'], gulp.series('handlebars'));

    gulp.watch('./src/img/icons/*svg', gulp.series('sprite', 'handlebars'));

    gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
    gulp.watch('./src/img/**/*', gulp.series('images'));
    gulp.watch('./src/assets/**/*', gulp.series('assets'));
});

gulp.task('images', function() {
    return gulp
        .src(['./src/img/**/*'])
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream());
});

gulp.task('optimize-images', function() {
    return gulp
        .src(['./src/img/**/*.jpg', './src/img/**/*.png'])
        .pipe(
            gulpCache(
                gulpSquoosh(({ width, height, size, filePath }) => ({
                    preprocessOptions: {},
                    encodeOptions: {
                    // jxl: {
                    //     quality: 80
                    // },
                    // avif: {
                    //     quality: 80
                    // },
                    webp: {
                        quality: 80
                    },
                    ...(path.extname(filePath) === ".png"
                        ? { oxipng: {quality: 80} }
                        : { mozjpeg: {quality: 80} }),
                    },
                }))
            )
        )
        .pipe(gulp.dest('./build/img'))
});

gulp.task('assets', function() {
    return gulp
        .src('./src/assets/**/*')
        .pipe(newer('./build/assets'))
        .pipe(gulp.dest('./build/assets'))
        .pipe(browserSync.stream());
});

gulp.task('beautify-html', () => {
    return gulp.src('./build/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeComments: true
        }))
        .pipe(prettyHtml({
            indent_size: 4,
            indent_char: ' ',
            indent_inner_html: true,
            unformatted: [],
            content_unformatted: [],
            wrap_line_length: 0,
            inline: [],
            extra_liners: ['header','main','footer', '/body']
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('ftp', () => {
    const ftpSettings = require('./ftp-settings');
    const connect = ftp.create(ftpSettings);
    
    return gulp.src('build/**/*.*')
        .pipe(connect.dest(ftpSettings._dest))
})

gulp.task('build', gulp.series('clean', 'images', 'sprite', 'handlebars', gulp.parallel('assets', 'styles', 'scripts')));

gulp.task('build-production', gulp.series('clean', 'images', 'sprite', 'handlebars', 'beautify-html', gulp.parallel('assets', 'styles', 'scripts-production')));

gulp.task('default', gulp.series('build', 'serve'));