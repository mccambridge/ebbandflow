'use strict';

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	// app.js
	'use strict';

	var deviceTweaks = __webpack_require__(1);
	var svg = __webpack_require__(2);
	var debounce = __webpack_require__(3);
	var menuClickHandler = __webpack_require__(4);
	var headerClickHandler = __webpack_require__(5);

	var liame = ['74', '69', '6D', '67', '72', '61', '64', '79', '40', '6D', '65', '2E', '63', '6F', '6D'];
	var enohp = ['28', '38', '34', '33', '29', '20', '32', '32', '34', '2D', '30', '37', '35', '39'];
	var tseuqer = ['74', '69', '6D', '67', '72', '61', '64', '79', '40', '6D', '65', '2E', '63', '6F', '6D', '3F', '73', '75', '62', '6A', '65', '63', '74', '3D', '52', '65', '71', '75', '65', '73', '74', '20', '41', '63', '63', '65', '73', '73', '20', '54', '6F', '20', '50', '68', '6F', '74', '6F', '73', '26', '62', '6F', '64', '79', '3D', '48', '69', '2C', '20', '54', '69', '6D', '2E', '20', '49', '27', '64', '20', '6C', '69', '6B', '65', '20', '74', '6F', '20', '73', '65', '65', '20', '79', '6F', '75', '72', '20', '70', '68', '6F', '74', '6F', '20', '67', '61', '6C', '6C', '65', '72', '79', '2E'];

	(function ($) {
		var ebby = {
			events: function events() {
				// wire up hamburger
				$('body').on('click touchend', '#header-menu-trigger', menuClickHandler);
				$('body').on('click touchend', '#nav-title', headerClickHandler);
				$(window).smartresize(function () {
					deviceTweaks();
				});
				$('.lazy').on('appear', function () {
					$('.grid').masonry('layout');
				});
			},
			decodeContactInto: function decodeContactInto() {
				$('#liame').html('<a href="mailto:&#x' + liame.join(';&#x') + ';">&#x' + liame.join(';&#x') + ';</a>');
				$('#enohp').html('<a href="tel:&#x' + enohp.join(';&#x') + ';">&#x' + enohp.join(';&#x') + ';</a>');
				$('#tseuqer').html('<a href="mailto:&#x' + tseuqer.join(';&#x') + ';">Request access to full photo gallery</a>');
			},
			init: function init() {
				var _this = this;

				$(document).ready(function () {
					$('.lazy').lazyload();
					deviceTweaks();
					_this.events();
					_this.decodeContactInto();
					svg();
				});
			}
		};

		ebby.init();
	})(jQuery);

	/***/
},
/* 1 */
/***/function (module, exports) {

	// device.js
	module.exports = function deviceTweaks() {
		var $ww = $(window).width();
		if ($ww < 1200) {
			$('.header__nav__list').addClass('header__nav__list--off-canvas');
		}
		if ($ww >= 900) {
			$('.header__nav__list').removeClass('header__nav__list--off-canvas');

			var $grid = $('.grid').masonry({
				itemSelector: '.grid__item',
				columnWidth: '.grid__sizer',
				percentPosition: true
			});

			$grid.imagesLoaded().progress(function () {
				$grid.masonry('layout');
			});
		}
	};

	/***/
},
/* 2 */
/***/function (module, exports) {

	// svg.js
	module.exports = function svg() {
		// http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement
		$('img.svg').each(function () {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			$.get(imgURL, function (data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');

				// Add replaced image's ID to the new SVG
				if (typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Replace image with new SVG
				$img.replaceWith($svg);
			}, 'xml');
		});
	};

	/***/
},
/* 3 */
/***/function (module, exports) {

	(function ($, sr) {

		// debouncing function from John Hann
		// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
		var debounce = function debounce(func, threshold, execAsap) {
			var timeout;

			return function debounced() {
				var obj = this,
				    args = arguments;
				function delayed() {
					if (!execAsap) func.apply(obj, args);
					timeout = null;
				};

				if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);

				timeout = setTimeout(delayed, threshold || 100);
			};
		};
		// smartresize
		jQuery.fn[sr] = function (fn) {
			return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
		};
	})(jQuery, 'smartresize');

	/***/
},
/* 4 */
/***/function (module, exports) {

	// menuClick.js
	module.exports = function menuClickHandler(e) {
		e.preventDefault();
		var $hamburger = $(this);
		var $menu = $hamburger.siblings('.header__nav__list');
		var $wordmark = $hamburger.parent().siblings('.header__title').find('.header__title__wordmark');
		var $logo = $hamburger.parent().siblings('.header__logo');

		$hamburger.toggleClass('header__nav__hamburger--active');
		$menu.toggleClass('header__nav__list--active').find('a').addClass('link-on-dark');
		$wordmark.toggleClass('header__title__wordmark--off-canvas');
		$logo.toggleClass('header__logo--off-canvas');

		$('html, body').toggleClass('frozen');

		// if menu is opening, fix body position. or return to normal
		if ($menu.hasClass('header__nav__list--active')) {
			var topVal = $(window).scrollTop();
			var windowHeight = $(window).height();
			$menu.css({ 'height': windowHeight * 2, 'top': $menu.css('top') - topVal + 'px' });
		}

		// handle transition on logo
		if (!$logo.hasClass('header__logo--off-canvas')) {
			console.log('yo!');
			$wordmark.toggleClass('header__title__wordmark--off-canvas--exiting');
			$logo.toggleClass('header__logo--off-canvas--exiting');
			setTimeout(function () {
				$wordmark.toggleClass('header__title__wordmark--off-canvas--exiting');
				$logo.toggleClass('header__logo--off-canvas--exiting');
			}, 500);
		}
	};

	/***/
},
/* 5 */
/***/function (module, exports) {

	// headerClick.js
	// handle clicking on the wordmark, which is not an <a> tag
	module.exports = function headerClickHandler() {
		window.location = '/';
	};

	/***/
}
/******/]);