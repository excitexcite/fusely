import util from 'gulp-util';
import vinylFTP from 'vinyl-ftp';
import { configFTP } from '../config/ftp.js';

export const ftp = () => {
	configFTP.log = util.log;
	const ftpConnetion = vinylFTP.create(configFTP);
	return app.gulp
		.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(ftpConnetion.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
};
