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

var navigationMenu = document.getElementsByClassName('navigation-menu')[0];
var navigationItems = document.getElementsByClassName('navigation-items')[0];

// Desktop Menu Open/Closed Trigger
var triggerMenuButton = document.getElementsByClassName('trigger-menu')[0];
var menuOpenTrigger = false; //init state of Trigger

// Mobile menu overlay toggle
var menuOverlayToggle = document.getElementById('menu-overlay-toggle');

var selectedProduct;


reset();


function reset() {
    productsInSliderView = Math.round((productsSliderView.clientWidth-2)/productTile.clientWidth);
    productTileWidthInPercentage = 100/productsInSliderView;
    validateSliding();
    hideAndShowArrows();
};


function moveLeft() {
    shiftIndex++;
    validateSliding();
    hideAndShowArrows()
}

function moveRight() {
    shiftIndex--;
    validateSliding();
    hideAndShowArrows();
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
    if (selectedProduct > 0) {
        destination = $('.slider-section').offset().top; // if sticky header: destination - $('.header').height() - 10;
        $('html, body').animate({ scrollTop: destination }, 1000, 'swing', function() {
            validateSliding();
            hideAndShowArrows();
        });
        shiftIndex = 1-selectedProduct;
    }
}


function closeMenu() {

    if (menuOverlayToggle.checked) {
        menuOverlayToggle.checked = false;
    }

    if (navigationMenu.classList.contains('menu-active')) {
    navigationMenu.classList.remove('menu-active');
    }
}


function triggerDesktopMenu() {
     if (menuOpenTrigger) {
        navigationMenu.classList.remove('menu-active');
        menuOpenTrigger = !menuOpenTrigger;
    } else {
        navigationMenu.classList.add('menu-active');
        menuOpenTrigger = !menuOpenTrigger;
    }
    
}

$('.navigation-items').on('click', 'a', function(e) {
    e.preventDefault();
    selectedProduct = $(e.target).closest('.navigation-items')
    .children()
    .index($(e.target).parent())+1;

})

btnPrev.addEventListener('click', moveLeft);
btnNext.addEventListener('click', moveRight);
window.addEventListener('resize' , reset);
window.addEventListener('orientationchange' , reset);
navigationItems.addEventListener('click', closeMenu);
navigationItems.addEventListener('click', scrollToSliderAndSelectProduct);
triggerMenuButton.addEventListener('click', triggerDesktopMenu);

});




