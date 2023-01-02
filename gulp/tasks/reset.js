import { deleteAsync } from 'del';

export const reset = () => {
	return deleteAsync(app.path.clean);
};

export const resetNoFonts = () => {
	return deleteAsync(app.path.cleanNoFonts);
};
