(function ($) {
    var Slider = function (element, options) {
        //this = {}
        this.$slider = element;
        this.$btns = this.$slider.parent().find('.slider__nav-arrow');

        this.settings = $.extend({
            slidesToShow: 5,
            firstActiveSlide: 0
        }, options);

        //return this
    };

    Slider.prototype.init = function () {
        this.setSlidesToShow(this.settings.slidesToShow);
        this.setActiveSlides(this.settings.slidesToShow, this.settings.firstActiveSlide);
        this.sliderAction(this.settings.firstActiveSlide);
        this.bindEvents();
    };

    Slider.prototype.handleSlides = function (event) {
        var isLeftbtn = $(event.currentTarget).hasClass('slider_left-arrow') ? true : false,
            firstActiveSlide = this.getFirstActiveSlide();

        if (isLeftbtn && firstActiveSlide === 0 || !isLeftbtn && firstActiveSlide + this.settings.slidesToShow === this.getSlidesCount())
            return;

        var futureSlideIndex = (isLeftbtn ? -1 : 1) + firstActiveSlide;

        this.setActiveSlides(this.settings.slidesToShow, futureSlideIndex);
        this.sliderAction(futureSlideIndex);
    };

    Slider.prototype.sliderAction = function (futureSlideIndex) {
        this.$slider[0].style.transform = 'translateX(' + this.getSlidingValue(futureSlideIndex) + 'px)';
    };

    Slider.prototype.setSlidesToShow = function (slidesToShow) {
        this.$slider.children().css('flex-basis', 100 / slidesToShow + '%');
    };

    Slider.prototype.setActiveSlides = function (count, index) {
        var self = this;

        $('.active', self.$slider).removeClass('active');

        for (var i = index; i < index + count; i++) {
            self.$slider.children().eq(i).addClass('active');
        }
    };

    Slider.prototype.getSlidesCount = function () {
        return this.$slider.children().length;
    };

    Slider.prototype.getFirstActiveSlide = function () {
        return this.$slider.children('.active').first().index();
    };

    Slider.prototype.getSlidingValue = function (futureSlideIndex) {
        return -this.$slider.children().first().innerWidth() * futureSlideIndex;
    };

    Slider.prototype.bindEvents = function () {
        var self = this;

        self.$btns.on('click', self.handleSlides.bind(self));
    };

    $.fn.slider = function (options) {
        return this.each(function () {
            var $element = $(this);
            if (!$element.data('initialized')) {
                new Slider($element, options).init();

                $element.data('initialized', true);
            }
        });
    };
}(jQuery));

document.addEventListener('DOMContentLoaded', function () {
    $('.first-slider').slider({
        slidesToShow: 4,
        firstActiveSlide: 2
    });

    $('.second-slider').slider();
});
