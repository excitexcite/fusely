import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';

import autoprefixer from 'gulp-autoprefixer'; // vendor prefixes
import cleanCss from 'gulp-clean-css'; // minification css file
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // grouping media queries
import webpcss from 'gulp-webpcss'; // webp images
import postcss from 'gulp-postcss'; // gulp plugin for postcss api
import mqpacker from 'css-mqpacker'; // old package that is a part of sort-css-media-queries
import sortCSSmq from 'sort-css-media-queries'; // sort media queries

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
			.pipe(
				app.plugins.if(
					app.isBuild,
					postcss([
						mqpacker({
							sort: sortCSSmq,
						}),
					])
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
