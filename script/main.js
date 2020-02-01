
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

var navigationItemsSelect = document.getElementById('navigation-items');
var oneNavigationItemSelect = navigationItemsSelect.querySelectorAll('option');
var menuItems = document.getElementsByClassName('navigation-items')[0];
var oneMenuItem = menuItems.querySelectorAll('.navigation-item');
var menuOpenTrigger;
var selectedProduct;


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

function scrollToSliderAndSelectProduct() {
    var destination;

    selectedProduct = Number(navigationItemsSelect.value);
    if (selectedProduct > 0) {
        destination = $('.slider-section').offset().top;
        $('html').animate({ scrollTop: destination }, 1000);
        shiftIndex = 1-selectedProduct;
    }
    validateSliding();
    hideAndShowArrows()
}


function closeMobileMenu() {
    var menuOverlayToggle = document.getElementById('menu-overlay-toggle');
    if (menuOverlayToggle.checked) {
        menuOverlayToggle.checked = false;
    }
}


var menuOpenTrigger = false;

function triggerDesktopMenu() {
    
    if (menuOpenTrigger) {
        menuItems.classList.remove('menu-active');
        menuOpenTrigger = !menuOpenTrigger;
    } else {
        menuItems.classList.add('menu-active');
        menuOpenTrigger = !menuOpenTrigger;
    }
    
}

function bindMenuItemsToSelect() {
   
    
}


btnPrev.addEventListener('click', moveLeft);
btnNext.addEventListener('click', moveRight);
window.addEventListener('resize' , reset);
window.addEventListener('orientationchange' , reset);
navigationItemsSelect.addEventListener('change', closeMobileMenu);
navigationItemsSelect.addEventListener('change', scrollToSliderAndSelectProduct);
menuItems.addEventListener('click', closeMobileMenu);
menuItems.addEventListener('click', triggerDesktopMenu);
menuItems.addEventListener('click', bindMenuItemsToSelect);

});




