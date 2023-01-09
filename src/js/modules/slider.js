// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

const testimonialsSlider = new Swiper('.testimonials__swiper-container', {
	slidesPerView: 'auto',
	centeredSlides: true,
	spaceBetween: 45,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});
