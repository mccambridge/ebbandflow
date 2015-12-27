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
    },

    init() {
      $(document).ready(() => {
        deviceTweaks();
        this.events();
        svg();
      });
    }
  }

  ebby.init();
})(jQuery);
