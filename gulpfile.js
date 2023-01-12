import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins,
};

import { copy } from './gulp/tasks/copy.js';
import { fontsStyle, otfToTtf, ttfToWoff } from './gulp/tasks/fonts.js';
import { ftp } from './gulp/tasks/ftp.js';
import { html } from './gulp/tasks/html.js';
import { images } from './gulp/tasks/images.js';
import { js } from './gulp/tasks/javascript.js';
import { reset } from './gulp/tasks/reset.js';
import { resetNoFonts } from './gulp/tasks/reset.js';
import { scss } from './gulp/tasks/scss.js';
import { server } from './gulp/tasks/server.js';
import { svgSpriteCreate } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';

// watching source files` changes
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

export { svgSpriteCreate };
export { dev };
export { devNoFonts };
export { build };
export { buildNoFonts };
export { deployZip };
export { deployFTP };
export { fonts };

// processing fonts
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(
	fonts,
	gulp.parallel(copy, html, scss, js, images, svgSpriteCreate)
);
const mainTasksNoFonts = gulp.series(
	gulp.parallel(copy, html, scss, js, images, svgSpriteCreate)
);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const devNoFonts = gulp.series(
	resetNoFonts,
	mainTasksNoFonts,
	gulp.parallel(watcher, server)
);
const buildNoFonts = gulp.series(resetNoFonts, mainTasksNoFonts);
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

gulp.task('default', dev);
