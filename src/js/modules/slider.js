// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation]);

const mainSlider = new Swiper('.', {
	slidesPerView: 'auto',
	spaceBetween: 20,

	breakpoints: {
		900: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		1100: {
			spaceBetween: 30,
		},
	},
});
