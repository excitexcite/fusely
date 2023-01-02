export function isWebp() {
	function testWebP(callback) {
		// webp support check
		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}

	testWebP(function (support) {
		// adding appropriate class to html
		if (support == true) {
			document.querySelector('html').classList.add('webp');
		} else {
			document.querySelector('html').classList.add('no-webp');
		}
	});
}
