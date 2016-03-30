// device.js
module.exports = function deviceTweaks() {
  const $ww = $(window).width();
  if ($ww < 1200) {
    $('.header__nav__list')
      .addClass('header__nav__list--off-canvas');
  }
  if ($ww >= 900) {
    $('.header__nav__list')
      .removeClass('header__nav__list--off-canvas');

    var $grid = $('.grid').masonry({
      itemSelector: '.grid__item',
      columnWidth: '.grid__sizer',
      percentPosition: true
    });

    $grid.imagesLoaded().progress(() => {
      $grid.masonry('layout');
    });
  }
}
