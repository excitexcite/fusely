import browsersync from 'browser-sync';
import ifPlugin from 'gulp-if'; // if-else
import newer from 'gulp-newer'; // update checker for images, allows doesn`t disturb unchanged images
import notify from 'gulp-notify'; // tips messages
import plumber from 'gulp-plumber';
import replace from 'gulp-replace'; // search and replacement

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
};
