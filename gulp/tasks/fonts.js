import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
	return (
		app.gulp
			.src(`${app.path.srcFolder}/fonts/*.otf`, {})
			// converting to ttf
			.pipe(
				fonter({
					formats: ['ttf'],
				})
			)
			.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
	);
};

export const ttfToWoff = () => {
	// getting .ttf files
	return (
		app.gulp
			.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
			// converting to .woff
			.pipe(
				fonter({
					formats: ['woff'],
				})
			)
			// output them to dist folder
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
			// getting .ttf files
			.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
			// converting to .woff2
			.pipe(ttf2woff2())
			// output them to dist folder
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
	);
};

export const fontsStyle = () => {
	// files with fonts to include
	let fontsFile = `${app.path.srcFolder}/scss/base/_fonts.scss`;
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFile) {
			if (!fs.existsSync(fontsFile)) {
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (let i = 0; i < fontsFiles.length; i++) {
					let fontFileName = fontsFiles[i].split('.')[0];
					// console.log(`fontFileName = ${fontFileName}`);
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0]
							? fontFileName.split('-')[0]
							: fontFileName;
						let fontWeight = fontFileName.split('-')[1]
							? fontFileName.split('-')[1]
							: fontFileName;
						// console.log(`fontName = ${fontName}`);
						// console.log(`fontWeight = ${fontWeight}`);
						switch (fontWeight.toLocaleLowerCase()) {
							case 'thin':
								fontWeight = 100;
								break;
							case 'extraLight':
								fontWeight = 200;
								break;
							case 'light':
								fontWeight = 300;
								break;
							case 'medium':
								fontWeight = 500;
								break;
							case 'semibold':
								fontWeight = 600;
								break;
							case 'bold':
								fontWeight = 700;
								break;
							case 'extrabold':
							case 'heavy':
								fontWeight = 800;
								break;
							case 'black':
								fontWeight = 900;
								break;
							default:
								fontWeight = 400;
						}
						fs.appendFile(
							fontsFile,
							`@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
							cb
						);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// If file exists, manualy delete the file
				console.log(
					'Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!'
				);
			}
		}
	});
	return app.gulp.src(`${app.path.srcFolder}`);

	function cb() {}
};
