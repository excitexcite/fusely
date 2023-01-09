'use strict';

import * as slider from './modules/slider.js';
import * as func from './modules/functions.js';
import * as theme from './modules/theme.js';

func.isWebp();

const navigationHieght = document.querySelector('.header');
document.documentElement.style.setProperty(
	'--scroll-padding',
	navigationHieght.getBoundingClientRect().height + 'px'
);

const menuToggle = document.querySelector('.menu-button');
const menuBody = document.querySelector('.menu__body');

if (menuToggle) {
	menuToggle.addEventListener('click', function (event) {
		const isOpened = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', !isOpened);
		toggleBurgerInteractionClasses();
	});
}

function toggleBurgerInteractionClasses() {
	// disable scroll on the page while menu is open
	document.documentElement.classList.toggle('scroll-lock');
	menuToggle.classList.toggle('menu-button--active');
	menuBody.classList.toggle('menu__body--active');
}

/// watching page scroll to remove extra padding from header
/// after scrolling a bit from the top of the page
const header = document.querySelector('.header');
const mainSectionAnchor = document.querySelector('.hero__title');
const headerSectionOptions = {
	rootMargin: '-200px 0px 0px 0px',
};

const headerSectionObserver = new IntersectionObserver(function (
	entries,
	headerSectionObserver
) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			header.classList.add('header--scrolled');
		} else {
			header.classList.remove('header--scrolled');
		}
	});
},
headerSectionOptions);

headerSectionObserver.observe(mainSectionAnchor);

/// listening to intersectioning with site section
/// to add underline to site navigation link
const navMenuLinks = document.querySelectorAll('.menu__link');
const navMenuObserver = new IntersectionObserver(
	function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				navMenuLinks.forEach((link) => {
					const targetSection = link.getAttribute('href').replace('#', '');
					link.classList.toggle(
						'menu__link--active',
						targetSection === entry.target.id
					);
				});
			}
		});
	},
	{
		rootMargin: '-100px 0px 0px 0px',
	}
);

document
	.querySelectorAll('.section')
	.forEach((section) => navMenuObserver.observe(section));

/// scroll to site section and clost mobile after the click on link
navMenuLinks.forEach((link) => {
	link.addEventListener('click', function (event) {
		if (menuBody.classList.contains('menu__body--active')) {
			toggleBurgerInteractionClasses();
		}
	});
});
