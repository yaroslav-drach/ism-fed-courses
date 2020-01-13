Latteps = {
  selects: function () {
      $('select').selectmenu({
          appendTo: '.language-selector',
          classes: {
              'ui-selectmenu-button': 'ui-language-selector-button',
              'ui-selectmenu-menu': 'ui-language-selector-menu'
          }
      }).selectmenu('open').selectmenu('close');

      $(window).on('resize orientationchange', function () { 
          $('select').selectmenu('open').selectmenu('close');
      });
  },
  slider: function () {
      var $slider = $('.slider');

      if (!$slider.length)
          return;

      var url = new URL(window.location.href),
          variantToShow = url.searchParams.get('variant');

      var $container = $('.variant' + variantToShow + '');
      $container.show();
      
      $('.slider-main', $container).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          infinite: false,
          arrows: true,
          centerPadding: '180px',
          responsive: [
              {
                  breakpoint: 1280,
                  settings: {
                      centerPadding: '109px'
                  }
              },
              {
                  breakpoint: 768,
                  settings: {
                      centerPadding: '25px'
                  }
              }
          ]
      });
  },
  fakeUploader: function () {
      $('#uploadBtn').click(function (e) {
          e.preventDefault();
          $('#uploadInput').click();
      });

      $('#uploadInput').on('change', function () {
          var $inputLabel = $('.file-uploader-label'),
              valueToSet = this.value;

          if (this.value)
              $inputLabel.html(valueToSet.match(/[^\\/]+$/)[0]);
          else
              $inputLabel.html($inputLabel.data('default-value'));
      });
  },
  scrollPage: function () {
      $('.scroll-page').on('click', function (e) {
          if ($('body').hasClass('content-page')) {
              window.location.href = '/' + this.hash;
              return;
          }

          e.preventDefault();

          var target = this.hash,
              $target = $(target);

          if (!$target.length) {
              return;
          }

          $('#hamburger-menu-checkbox').prop('checked', false);

          $('html, body').stop().animate({
              'scrollTop': $target.offset().top
          }, 700, 'swing', function () {
              window.location.hash = target;
              history.pushState('', document.title, window.location.pathname);
          });
      });
  },
  initValidation: function () {
      var $form = $('form');

      if (!$form.length)
          return;

      $form.validate();

      $form.on('change submit', function () {
          if (!$form.valid())
              $('.validation-summary', $form).show();
          else
              $('.validation-summary', $form).hide();
      });
  },
  acceptCookies: {
      setUserAcceptsCookies: function () {
          var d = new Date();
          var expiresInDays = 30 * 24 * 60 * 60 * 1000;
          d.setTime(d.getTime() + expiresInDays);
          var expires = "expires=" + d.toGMTString();
          document.cookie = 'EU_COOKIE_LAW_CONSENT' + '=' + true + "; " + expires + ";path=/" + "; SameSite=Lax";
          $('.cookies-wrapper').hide();
      },
      // Let's see if we have a consent cookie already
      userAlreadyAcceptedCookies: function () {
          var userAcceptedCookies = false;
          var cookies = document.cookie.split(";");
          for (var i = 0; i < cookies.length; i++) {
              var c = cookies[i].trim();
              if (c.indexOf('EU_COOKIE_LAW_CONSENT') !== -1) {
                  userAcceptedCookies = c.substring('EU_COOKIE_LAW_CONSENT'.length + 1, c.length);
              }
          }

          return userAcceptedCookies;
      },
      init: function () {
          var self = this;

          if (!self.userAlreadyAcceptedCookies()) {
              $('.cookies-wrapper').show();
              $('.cookies a').on('click', function (e) {
                  e.preventDefault();
                  self.setUserAcceptsCookies();
              });
          }
      }
  },
  animations: {
      isAnimated: true,
      isAnimatedTimeout: null,
      init: function () {
          Latteps.animations.fistImageFadeIn();
          Latteps.animations.pageScrollEffect.init();
      },
      fistImageFadeIn: function () {
          $('<img/>').attr('src', '/latteps/assets/images/top_img_desktop.jpg').on('load', function () { //  /latteps need to be removed
              $(this).remove();
              $('.banner .image').addClass('opacity1');
          });

          setTimeout(function () {
              $('.banner .image').addClass('opacity1');
          }, 4000);
      },
      pageScrollEffect: {
          timeOut: null,
          init: function () {
              Latteps.animations.pageScrollEffect.calculateWithTimeout();

              $(window).on('resize orientationchange', function () {
                  Latteps.animations.pageScrollEffect.calculateWithTimeout();
              });

              $(window).on('scroll', function (e) {
                  Latteps.animations.pageScrollEffect.calculateWithTimeout();                    
              });

              $(document).on('ontouchstart' in document.documentElement ? 'touchend' : 'mouseenter', '.hamburger-menu-ribbon', function (e) {
                  var $this = $(this);
                  if ('ontouchstart' in document.documentElement && $this.hasClass('hover')) {
                      $this.removeClass('hover');
                      Latteps.animations.isAnimated = false;
                  } else {
                      $this.addClass('hover');
                      Latteps.animations.isAnimated = true;
                      clearTimeout(Latteps.animations.isAnimatedTimeout);
                      Latteps.animations.isAnimatedTimeout = setTimeout(function () {
                          Latteps.animations.isAnimated = false;
                      }, 500);
                  }
              }).on('mouseleave', '.hamburger-menu-ribbon', function () {
                  $(this).removeClass('hover');
                  Latteps.animations.isAnimated = false;
              });
          },
          calculateWithTimeout: function () {
              clearTimeout(Latteps.animations.pageScrollEffect.timeOut);
              Latteps.animations.pageScrollEffect.timeOut = setTimeout(function () {
                  Latteps.animations.pageScrollEffect.calculate();
                  var $menuRibbon = $('.hamburger-menu-ribbon');
                  Latteps.navigation.isShowRibbon() ? $menuRibbon.addClass('shown') : $menuRibbon.removeClass('shown');
              }, 50);
          },
          calculate: function () {
              $('.title, .description, .header-holder, .flex-item , .btn, .background-image, .container-text, .list-partners > div, footer > div, .key-notes').each(function () {
                  var $this = $(this);
                  if (Latteps.animations.pageScrollEffect.isElementInView($this, false)) {
                      $this.addClass('in-view');
                  }
              });
          },
          isElementInView: function (element, fullyInView) {
              var $window = $(window),
                  pageTop = $window.scrollTop(),
                  pageBottom = pageTop + $window.height(),
                  elementTop = element.offset().top,
                  elementBottom = elementTop + element.height();

              if (fullyInView === true) {
                  return ((pageTop < elementTop) && (pageBottom > elementBottom));
              } else {
                  return ((elementTop < pageBottom) && (elementBottom >= pageTop));
              }
          }
      }
  },
  navigation: {
      isShowRibbon: function () {
          var $window = $(window),
              pageTop = $window.scrollTop(),
              $element = $('.nav-lang'),
              showRibbon = pageTop > $element.offset().top + $element.height();

          return showRibbon;
      },
      scrollToTop: function () {
          $('.hamburger-menu-ribbon').on('click', function (e) {
              if ($(e.target).is('a')) {
                  window.location.href = e.target.href;
              }
              else if (!Latteps.animations.isAnimated) {
                  $('html, body').stop().animate({
                      'scrollTop': 0
                  }, 700, 'swing');
                  $('.hamburger-menu-ribbon').removeClass('hover');
                  Latteps.animations.isAnimated = true;
              }
          });
      }
  },
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
  Latteps.init();
});