



document.addEventListener('DOMContentLoaded', function () {

var carouselElement = document.getElementsByClassName('product-slider');
var productsSliderView = carouselElement[0].querySelector('.product-slider-view');
var productsList = carouselElement[0].querySelector('.products-grid');

var productsNumber = carouselElement[0].querySelectorAll('.product-tile').length;
var productTile = carouselElement[0].querySelector('.product-tile');

var btnPrev = carouselElement[0].querySelector('.btn-prev');
var btnNext = carouselElement[0].querySelector('.btn-next');
var shiftIndex = 0;

var productsInSliderView;
var productTileWidthInPercentage;


reset();


function reset() {
    productsInSliderView = Math.round((productsSliderView.clientWidth-2)/productTile.clientWidth);
    productTileWidthInPercentage = 100/productsInSliderView;
    validateSliding();
    hideAndShowArrows()
};


function moveLeft() {
    shiftIndex++;
    validateSliding();
    hideAndShowArrows()
}

function moveRight() {
    shiftIndex--;
    validateSliding();
    hideAndShowArrows()
}


function hideAndShowArrows() {
    if (shiftIndex < productsInSliderView - productsNumber + 1) {
        btnNext.style.display="none";
    } else {
        btnNext.style.display="block";
    }

    if (shiftIndex >= 0) {
        btnPrev.style.display="none";
    }
    else {
        btnPrev.style.display="block";
    }

}

function validateSliding() {

    if (shiftIndex < productsInSliderView - productsNumber) {
        shiftIndex = productsInSliderView - productsNumber;
    }

    if (shiftIndex > 0) {
        shiftIndex = 0;
    }

    productsList.style.left = shiftIndex * productTileWidthInPercentage + '%';

}

function handleMenuChange() {
    document.scrollIntoView({block: "center", behavior: "smooth"});
}


btnPrev.addEventListener('click', moveLeft);
btnNext.addEventListener('click', moveRight);
window.addEventListener('resize' , reset);
window.addEventListener('orientationchange' , reset);


});




