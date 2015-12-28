// menuClick.js
module.exports = function menuClickHandler(e) {
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
    console.log('yo!');
    $wordmark.toggleClass('header__title__wordmark--off-canvas--exiting');
    $logo.toggleClass('header__logo--off-canvas--exiting');
    setTimeout(() => {
      $wordmark.toggleClass('header__title__wordmark--off-canvas--exiting');
      $logo.toggleClass('header__logo--off-canvas--exiting');
    }, 500);
  }
}