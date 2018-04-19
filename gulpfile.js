const gulp = require('gulp');
const browserSync = require('browser-sync');
const plugin = require('gulp-load-plugins');

gulp.task('watch',['browserSync','sass'],() => { // Gulp watch effectue l'action demandé quand watch est appelé
    gulp.watch('app/assets/sass/main.scss',['sass']);
    gulp.watch('app/index.html',browserSync.reload);
    gulp.watch('app/js/*.js',browserSync.reload);
});

gulp.task('sass',() => { // Compile SASS files into CSS files
    return gulp.src('app/assets/sass/main.scss')
    .pipe(plugin.gulpSass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}));
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
    .pipe(plugin.useref())
    .pipe(plugin.gulpIf('app/assets/js/*.js',plugin.uglify()))
    .pipe(plugin.gulpIf('app/css/main.css',plugin.cssNano()))
    .pipe(gulp.dest('src'));
});

gulp.task('clean:src',() => { // Supprime le fichier appelés 
    return plugin.sync('src/*.+(html|css|js)');
});

gulp.task('build',(callback) => {
    return plugin.runSequence('clean:src','useref',callback);
});
