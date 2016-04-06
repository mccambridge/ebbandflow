// app.js
'use strict';
const deviceTweaks = require('./device.js');
const svg = require('./utils/svg.js');
const debounce = require('./utils/debounce.js');
const menuClickHandler = require('./events/menuClick.js');

(($) => {
  const ebby = {
    events() {
      // wire up hamburger
      $('body').on('click touchend', '#header-menu-trigger', menuClickHandler);
      $(window).smartresize(function(){
        deviceTweaks();
      });
      $('.lazy').on('appear', () => {
        $('.grid').masonry('layout');
      });
    },

    init() {
      $(document).ready(() => {
        $('.lazy').lazyload();
        deviceTweaks();
        this.events();
        svg();
      });
    }
  }

  ebby.init();
})(jQuery);
