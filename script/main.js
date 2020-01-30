/*Slider = {

  init: function () {
      $('body').addClass('opacity1');
      this.navigation.scrollToTop();
      this.animations.init();
      this.selects();
      this.slider();
      this.fakeUploader();
      this.scrollPage();
      this.initValidation();
      this.acceptCookies.init();
  }
};


document.addEventListener('DOMContentLoaded', function () {
  Slider.init();
});
*/

/* https://codepen.io/maxim-komarov-the-scripter/pen/BaybyrZ */

document.addEventListener('DOMContentLoaded', function () {
window.addEventListener('resize', reset);


var carouselElement = document.getElementsByClassName('product-slider');
var listElements = carouselElement[0].querySelector('.products-grid');


function reset() {
    var viewElementsWidth = carouselElement[0].querySelector('.product-slider-view').clientWidth-2;
    console.log(viewElementsWidth);

};


var itemsNumber = carouselElement[0].querySelectorAll('.product-tile').length;
var itemWidth = carouselElement[0].querySelector('.product-tile').clientWidth;

var btnPrev = carouselElement[0].querySelector('.left-button');
var btnNext = carouselElement[0].querySelector('.right-button');
var shiftIndex = 0;


btnNext.addEventListener('click', function() {
    if (shiftIndex > Math.round(viewElementsWidth/itemWidth) - itemsNumber) {
        shiftIndex--;
        listElements.style.left = shiftIndex * 100 * (itemWidth/viewElementsWidth) + '%';
        console.log(listElements.style.left);
    }
});


btnPrev.addEventListener('click', function(){
    if (shiftIndex < 0) {
        shiftIndex++;
        listElements.style.left = shiftIndex * 100 * (itemWidth/viewElementsWidth) + '%';
        console.log(listElements.style.left);
    }
});



console.log(carouselElement);


});







//(function($) {




//}(jQuery));


