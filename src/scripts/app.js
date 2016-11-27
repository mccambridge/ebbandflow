// app.js
'use strict';
const deviceTweaks = require('./device.js');
const svg = require('./utils/svg.js');
const debounce = require('./utils/debounce.js');
const menuClickHandler = require('./events/menuClick.js');
const headerClickHandler = require('./events/headerClick.js');

const liame = ['74','69','6D','67','72','61','64','79','40','6D','65','2E','63','6F','6D'];
const enohp = ['28','38','34','33','29','20','32','32','34','2D','30','37','35','39'];
const tseuqer = ['74','69','6D','67','72','61','64','79','40','6D','65','2E','63','6F','6D','3F','73','75','62','6A','65','63','74','3D','52','65','71','75','65','73','74','20','41','63','63','65','73','73','20','54','6F','20','50','68','6F','74','6F','73','26','62','6F','64','79','3D','48','69','2C','20','54','69','6D','2E','20','49','27','64','20','6C','69','6B','65','20','74','6F','20','73','65','65','20','79','6F','75','72','20','70','68','6F','74','6F','20','67','61','6C','6C','65','72','79','2E'];

(($) => {
  const ebby = {
    events() {
      // wire up hamburger
      $('body').on('click touchend', '#header-menu-trigger', menuClickHandler);
      $('body').on('click touchend', '#nav-title', headerClickHandler);
      $(window).smartresize(function(){
        deviceTweaks();
      });
      $('.lazy').on('appear', () => {
        $('.grid').masonry('layout');
      });
    },

    decodeContactInto() {
      $('#liame').html(`<a href="mailto:&#x${liame.join(';&#x')};">&#x${liame.join(';&#x')};</a>`);
      $('#enohp').html(`<a href="tel:&#x${enohp.join(';&#x')};">&#x${enohp.join(';&#x')};</a>`);
      $('#tseuqer').html(`<a href="mailto:&#x${tseuqer.join(';&#x')};">Request access to full photo gallery</a>`);
    },

    init() {
      $(document).ready(() => {
        $('.lazy').lazyload();
        deviceTweaks();
        this.events();
        this.decodeContactInto();
        svg();
      });
    }
  }

  ebby.init();
})(jQuery);
