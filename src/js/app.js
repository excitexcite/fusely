'use strict';

import { TabsAutomatic } from './modules/tabs-a11y.js';
import * as slider from './modules/slider.js';
import * as func from './modules/functions.js';

func.isWebp();

const navigationHieght = document.querySelector('.header');
document.documentElement.style.setProperty(
	'--scroll-padding',
	navigationHieght.getBoundingClientRect().height + 'px'
);

const menuToggle = document.querySelector('.menu-button');
const menuBody = document.querySelector('.menu-mobile');

if (menuToggle) {
	menuToggle.addEventListener('click', function (event) {
		const isOpened = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', !isOpened);
		toggleBurgerInteractionClasses();
	});
}

function toggleBurgerInteractionClasses() {
	// disable scroll on the page while menu is open
	document.body.classList.toggle('scroll-lock');
	menuToggle.classList.toggle('menu-button--active');
	menuBody.classList.toggle('menu-mobile--active');
}

const pcMenuContainer = document.getElementById('nav-other');
const mobileContacts = document.querySelector('.menu-mobile__contacts');
const menuItemsList = document.getElementById('other-dropdown');

const smallDevice = window.matchMedia('(min-width: 48em)');

smallDevice.addListener(handleDeviceChange);

function handleDeviceChange(e) {
	if (e.matches) {
		pcMenuContainer.append(menuItemsList);
	} else {
		mobileContacts.before(menuItemsList);
	}
}

// Run it initially
handleDeviceChange(smallDevice);
