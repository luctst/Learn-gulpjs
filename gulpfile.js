const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const cssNano = require('gulp-cssnano');
const runSequence = require('run-sequence');
const del = require('del');

gulp.task('watch',['browserSync','sass'],() => { // Gulp watch effectue l'action demandé quand watch est appelé
    gulp.watch('app/assets/sass/main.scss',['sass']);
    gulp.watch('app/index.html',browserSync.reload);
    gulp.watch('app/js/*.js',browserSync.reload);
});

gulp.task('sass',() => { // Compile SASS files into CSS files
    return gulp.src('app/assets/sass/main.scss').pipe(sass()).pipe(gulp.dest('app/css')).pipe(browserSync.reload({stream:true}));
});

gulp.task('browserSync', () => { // Configure browser-sync pour recharger le navigateur automatiquement
    browserSync.init({
        server:{
            baseDir: 'app'
        },
    })
});

gulp.task('useref',() => { // Crée un seul fichier js,css.. avec build et endbuild et minifie dans le dossier src les fichiers appelés
    return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulpIf('app/assets/js/*.js',uglify()))
    .pipe(gulpIf('app/css/main.css',cssNano()))
    .pipe(gulp.dest('src'));
});

gulp.task('clean:src',() => { // Supprime le fichier appelés 
    return del.sync('src/*.+(html|css|js)');
});

gulp.task('build',(callback) => {
    return runSequence('clean:src','useref',callback);
});