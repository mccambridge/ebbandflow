// app.js
'use strict';

(($) => {
  const ebby = {
    deviceTweaks() {
      if (screen.width < 1200) {
        $('.header__nav__list')
          .addClass('header__nav__list--off-canvas');
      }
    },

    events() {
      // wire up hamburger
      $('body').on('click touchend', '#header-menu-trigger', this._menuClickHandler)
    },

    init() {
      $(document).ready(() => {
        this.deviceTweaks();
        this.events();
        this._svgToInline();
      });
    },

    _menuClickHandler(e) {
      e.preventDefault();
      const $hamburger = $(this);
      const $menu = $hamburger.siblings('.header__nav__list');
      const $wordmark = $hamburger
        .parent()
        .siblings('.header__title')
        .find('.header__title__wordmark');
      const $logo = $hamburger
        .parent()
        .siblings('.header__logo');

      $hamburger.toggleClass('header__nav__hamburger--active');
      $menu.toggleClass('header__nav__list--active')
        .find('a').addClass('link-on-dark');
      $wordmark.toggleClass('header__title__wordmark--off-canvas');
      $logo.toggleClass('header__logo--off-canvas');

      $('html, body').toggleClass('frozen');

      // if menu is opening, fix body position. or return to normal
      if ($menu.hasClass('header__nav__list--active')) {
        const topVal = $(window).scrollTop();
        const windowHeight = $(window).height();
        $menu.css({'height': windowHeight * 2, 'top': `${($menu.css('top') - topVal)}px`});
      }

      // handle transition on logo
      if (!$logo.hasClass('header__logo--off-canvas')) {
        $wordmark.toggleClass('header__title__wordmark--off-canvas--exiting')
        $logo.toggleClass('header__logo--off-canvas--exiting');
        setTimeout(() => {
          $logo.toggleClass('header__title__wordmark--off-canvas--exiting');
          $logo.toggleClass('header__logo--off-canvas--exiting');
        }, 500);
      }
    },

    _svgToInline() {
      // http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement
      $('img.svg').each(function(){
          var $img = $(this);
          var imgID = $img.attr('id');
          var imgClass = $img.attr('class');
          var imgURL = $img.attr('src');

          $.get(imgURL, function(data) {
              // Get the SVG tag, ignore the rest
              var $svg = $(data).find('svg');

              // Add replaced image's ID to the new SVG
              if(typeof imgID !== 'undefined') {
                  $svg = $svg.attr('id', imgID);
              }
              // Add replaced image's classes to the new SVG
              if(typeof imgClass !== 'undefined') {
                  $svg = $svg.attr('class', imgClass+' replaced-svg');
              }

              // Remove any invalid XML tags as per http://validator.w3.org
              $svg = $svg.removeAttr('xmlns:a');

              // Replace image with new SVG
              $img.replaceWith($svg);

          }, 'xml');
      });
    }
  }

  ebby.init();
})(jQuery);
