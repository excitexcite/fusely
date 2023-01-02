import svgSprite from 'gulp-svg-sprite';

export const svgSpriteCreate = () => {
	return app.gulp
		.src(`${app.path.src.svgicons}`, {})
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: `../icons.svg`,
						// create table with icons` list
						example: true,
					},
				},
			})
		)
		.pipe(app.gulp.dest(`${app.path.build.images}`));
};
