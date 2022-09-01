const { src,dest, parallel, series, watch } = require("gulp");
let gulp=require("gulp");

const sourcemaps=require("gulp-sourcemaps");
const concat=require("gulp-concat");
const terser=require("gulp-terser");
const csspath="src/**/*.css";
const postcss=require ('gulp-postcss');
const cssnano=require('cssnano');
const autoprefixer=require('autoprefixer');
 const imagemin=require("gulp-imagemin");

function copyHtml()
{
return src("src/*.html").pipe(dest("dist"));
}
 function imgTask()
 {
    return src('src/images/*').pipe(imagemin()).pipe(dest("dist/images"));
 }
 function soundTask()
 {
    return src('src/sounds/*').pipe(dest("dist/sounds"));
 }
const jspath="src/**/*.js"
function jsTasks()
{
    return src(jspath)
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest("dist/assests/js"));
}

function cssTask()
{
    return src(csspath)
    .pipe(sourcemaps.init())
    .pipe(concat("combinestyle.css"))
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assests/cs"));

}

function watchTask()
{
    watch([jspath,csspath],{interval:1000},parallel(jsTasks,cssTask));
}
// exports.copyHtml=copyHtml;
// exports.default=series(copyHtml,jsTasks,cssTask);
//var uglify=require("")

exports.default=series(parallel(copyHtml,imgTask, jsTasks,cssTask,soundTask),watchTask);