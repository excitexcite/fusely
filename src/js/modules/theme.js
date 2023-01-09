// Select the dropdown
const themeDropdown = document.querySelector('.theme-switcher__list');

// Check for dark mode preference at the OS level
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Get the user's theme preference from local storage, if it's available
const currentTheme = localStorage.getItem('theme');
// If the user's preference in localStorage is dark...
if (currentTheme === 'dark') {
	// ...let's toggle the .dark-theme class on the body
	document.documentElement.classList.toggle('dark-theme');
	// Otherwise, if the user's preference in localStorage is light...
} else if (currentTheme === 'light') {
	// ...let's toggle the .light-theme class on the body
	document.documentElement.classList.toggle('light-theme');
}

themeDropdown.addEventListener('click', function (event) {
	const targetButton = event.target.closest('button');

	if (!targetButton) return;

	switch (targetButton.id) {
		case 'theme-os': {
			if (prefersDarkScheme.matches) {
				switchDarkTheme();
			} else {
				switchLightTheme();
			}
			localStorage.setItem('theme', '');
			break;
		}
		case 'theme-light': {
			switchLightTheme();
			localStorage.setItem('theme', 'light');
			break;
		}
		case 'theme-dark': {
			switchDarkTheme();
			localStorage.setItem('theme', 'dark');
			break;
		}
	}
});

function switchLightTheme() {
	document.documentElement.classList.add('light-theme');
	document.documentElement.classList.remove('dark-theme');
}

function switchDarkTheme() {
	document.documentElement.classList.add('dark-theme');
	document.documentElement.classList.remove('light-theme');
}
