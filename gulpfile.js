var gulp = require('gulp'); 
var less = require('gulp-less'); 
var path = require('path');
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');  
var autoPrefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');  
var validator = require('gulp-html');
var browserSync = require("browser-sync");
// var webfontsGenerator = require('webfonts-generator');

function html(done) {
  gulp.src('*.html')
  // .pipe(validator())
  .pipe(browserSync.stream())
  // .pipe(gulp.dest('./css'));
  .pipe(browserSync.stream())

  done();
}

function css(done) {
  gulp.src('./assets/less/*.less')
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(autoPrefixer('last 2 versions'))
  .pipe(concat('style.css'))  //contatena em um arquivo chamado main.js   
  // .pipe(uglify())
  .pipe(browserSync.stream())
  .pipe(gulp.dest('./css'));


  done();
}

function js(done) {
  gulp.src('./assets/js/*.js') //pega todos os arquivos .js que estão na pasta src   
    .pipe(concat('scripts-main.js'))  //contatena em um arquivo chamado main.js   
    .pipe(uglify())
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./js')); //e manda para a pasta js 
  
  done();
}




// A simple task to reload the page
function reload() {
  browserSync.reload();
}


// function webfontsGenerator(done) {
//   gulp.src('./assets/Fonts/*.ttf') //pega todos os arquivos .js que estão na pasta src   
//   .pipe(concat('style.css'))  //contatena em um arquivo chamado main.js   
//   .pipe(browserSync.stream())
//   .pipe(gulp.dest('web'));
  
//   done();
// }


// webfontsGenerator({
//   files: [
//     './assets/Fonts/HelveticaUltraLt_0.ttf',
//     './assets/Fonts/ps.ttf',
//     './assets/Fonts/Roboto-Light_0.ttf',
//     './assets/Fonts/Roboto-Regular_0.ttf',
//   ],
//   dest: 'web/', 
// }, function(error) {
//   if (error) {
//     console.log('Fail!', error);
//   } else {
//     console.log('Done!');
//   }
// })


// Watch files
function watchFiles() {
  gulp.watch("./assets/less/*.less", css);
  gulp.watch("./assets/js/*.js", gulp.series(js));
  gulp.watch("*.html", html);
  // gulp.watch("./assets/Fonts/*.ttf", webfontsGenerator);
  browserSync.init({   
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./assets/less/*.less", css);
  gulp.watch("./assets/js/*.js", js);
  gulp.watch("/*.html", html);  
  // gulp.watch("*.ttf", webfontsGenerator); 

}


gulp.task("css", css);
gulp.task("js", js);
gulp.task("html", html);
gulp.task("default", gulp.parallel(html,css, js));
gulp.task("watch", gulp.series(watchFiles));











