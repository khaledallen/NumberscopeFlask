const { src, dest, parallel, series, watch } = require('gulp');
const rollup = require('rollup');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

// Compile SASS to CSS and puts it all into styles.css in static/css/ folder
function compileSass() {
  return src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./static/css'));
}

// Minifies styles.css into styles.css.min
function cssMinify(cb) {
    return cb();
}

function jsBundle() {
    return rollup.rollup({
        input: './src/js/app.js',
    }).then(bundle => {
        return bundle.write({
            file: './static/js/scripts.js',
            format: 'umd',
            name: 'scripts',
            sourcemap: true
        });
    });
}

exports.default = function(){
    watch('./src/scss/**/*.scss', series(compileSass, cssMinify));
    watch('./src/js/**/*.js', jsBundle);
}

