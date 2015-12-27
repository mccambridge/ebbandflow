// app.js
'use strict';
const svg = require('./utils/svg.js');
const menuClickHandler = require('./events/menuClick.js');

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
