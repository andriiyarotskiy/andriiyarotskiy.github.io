const {src, dest, series, watch, parallel} = require('gulp');
const rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify-es').default,
    image = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');

const sassPaths = ['./node_modules'],
    fontsPaths = [
        './node_modules/font-awesome/fonts/*',
        './node_modules/slick-carousel/slick/fonts/*'
    ],
    jsPaths = [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/slick-carousel/slick/slick.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './app/js/*.js'
    ];

const dist = {
    js: './dist/js',
    css: './dist/css',
    img: './dist/img',
    fonts: './dist/fonts',
};

function sassToCss() {
    return src('./app/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(concat('app.scss'))
        .pipe(sass({includePaths: sassPaths}))
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(dist.css))
        .pipe(sass({
            outputStyle: 'compressed',
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename('app.min.css'))
        .pipe(dest(dist.css))
        .pipe(connect.reload());
}

function font() {
    return src(fontsPaths)
        .pipe(dest(dist.fonts));
}

function js() {
    return src(jsPaths)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(dest(dist.js))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename('script.min.js'))
        .pipe(dest(dist.js))
        .pipe(connect.reload());
}

function html() {
    return src('./app/index.html')
        .pipe(dest('./dist/'))
        .pipe(connect.reload());
}

function server() {
    connect.server({
        name: 'Dist App',
        root: 'dist',
        //host is local ip for working in local net
        host: '',
        port: 8080,
        livereload: true,
    });
}

function imagemin() {
    return src('./app/img/**/*')
        .pipe(image())
        .pipe(dest(dist.img))
}

watch('./app/scss/**/*.scss', series(sassToCss));
watch('./app/js/*.js', series(js));
watch('./app/index.html', series(html));

exports.default = parallel(imagemin, series(sassToCss, js, font, html, server));