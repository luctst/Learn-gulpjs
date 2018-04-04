const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('watch',() => { // Gulp watch effectue action demandé quand watch est appelé
    gulp.watch('app/assets/sass/main.scss',['sass']);
});

gulp.task('sass',() => { // Compile SASS files into CSS files
    gulp.src('app/assets/sass/main.scss').pipe(sass()).pipe(gulp.dest('app/css'));
});
