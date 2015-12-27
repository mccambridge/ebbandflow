"use strict";

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

	var svg = __webpack_require__(!(function webpackMissingModule() {
		var e = new Error("Cannot find module \"./utils/svg.js\"");e.code = 'MODULE_NOT_FOUND';throw e;
	})());

	(function ($) {
		var ebby = {
			deviceTweaks: function deviceTweaks() {
				if (screen.width < 1200) {
					$('.header__nav__list').addClass('header__nav__list--off-canvas');
				}
			},
			events: function events() {
				// wire up hamburger
				$('body').on('click touchend', '#header-menu-trigger', this._menuClickHandler);
			},
			init: function init() {
				var _this = this;

				$(document).ready(function () {
					_this.deviceTweaks();
					_this.events();
					svg();
				});
			},
			_menuClickHandler: function _menuClickHandler(e) {
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
					$menu.css({ 'height': windowHeight * 2, 'top': $menu.css('top') - topVal + "px" });
				}

				// handle transition on logo
				if (!$logo.hasClass('header__logo--off-canvas')) {
					$wordmark.toggleClass('header__title__wordmark--off-canvas--exiting');
					$logo.toggleClass('header__logo--off-canvas--exiting');
					setTimeout(function () {
						$logo.toggleClass('header__title__wordmark--off-canvas--exiting');
						$logo.toggleClass('header__logo--off-canvas--exiting');
					}, 500);
				}
			}
		};

		ebby.init();
	})(jQuery);

	/***/
}
/******/]);