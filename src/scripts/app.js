// app.js
'use strict';
const svg = require('./utils/svg.js');
const menuClickHandler = require('./events/menuClick.js');

(($) => {
  const ebby = {
    deviceTweaks() {
      const $ww = $(window).width();
      if ($ww < 1200) {
        $('.header__nav__list')
          .addClass('header__nav__list--off-canvas');
      }
      if ($ww >= 600) {
        var $grid = $('.grid').masonry({
          itemSelector: '.grid__item',
          columnWidth: '.grid__sizer',
          percentPosition: true
        });

        $grid.imagesLoaded().progress(() => {
          $grid.masonry('layout');
        });
      }
    },

    events() {
      // wire up hamburger
      $('body').on('click touchend', '#header-menu-trigger', menuClickHandler)
    },

    init() {
      $(document).ready(() => {
        this.deviceTweaks();
        this.events();
        svg();
      });
    }
  }

  ebby.init();
})(jQuery);
