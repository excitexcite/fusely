import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';

import autoprefixer from 'gulp-autoprefixer'; // vendor prefixes
import cleanCss from 'gulp-clean-css'; // minification css file
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // grouping media queries
import webpcss from 'gulp-webpcss'; // webp images

const sass = gulpSass(dartSass);

export const scss = () => {
	return (
		app.gulp
			.src(app.path.src.scss, { sourcemaps: app.isDev })
			.pipe(
				sass({
					outputStyle: 'expanded',
				})
			)
			.pipe(app.plugins.replace(/@img\//g, '../img/'))
			.pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
			.pipe(
				app.plugins.if(
					app.isBuild,
					webpcss({
						webpClass: '.webp',
						noWebpClass: '.no-webp',
					})
				)
			)
			.pipe(
				app.plugins.if(
					app.isBuild,
					autoprefixer({
						grid: true,
						overrideBrowserslist: ['last 3 versions'],
						cascade: true,
					})
				)
			)
			// creating non minified css file if need
			.pipe(app.gulp.dest(app.path.build.css))
			.pipe(app.plugins.if(app.isBuild, cleanCss()))
			.pipe(
				rename({
					extname: '.min.css',
				})
			)
			.pipe(app.gulp.dest(app.path.build.css))
			.pipe(app.plugins.browsersync.stream())
	);
};
