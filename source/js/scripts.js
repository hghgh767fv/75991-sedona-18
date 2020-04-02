 var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');

  navMain.classList.remove('main-nav--nojs');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  });

var link = document.querySelector('.comment_button');
var popup = document.querySelector('.pop-up--success');
var close = document.querySelector('.pop-up__button');

link.addEventListener('click', function (evt) {
 evt.preventDefault();
 popup.classList.add('.pop-up_show');
});

close.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('pop-up_show');
});





