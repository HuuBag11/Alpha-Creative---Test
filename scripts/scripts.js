"use strict";
$ = jQuery;

$(document).ready(function () {
  slideBanner();
  scrollHeader();
  counterOnScroll();
});

function slideBanner() {
  let slideBanner = $(".section-banner__slide");

  if (slideBanner.length) {
    new Splide(slideBanner[0], {
      type: "loop",
      perPage: 1,
      interval: 6000,
      arrows: false,
      paginations: false,
      autoplay: false,
      speed: 2000,
      pauseOnHover: true,
      pauseonFocus: true
    }).mount();
  }
}

function scrollHeader() {
  let height = $(".header .header-wrapper__top").outerHeight();

  const nav = gsap
    .from("header", {
      y: "-" + height,
      paused: true,
      duration: 0.25,
      trigger: "header"
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      // Shrink nav
      self.direction === -1 ? nav.play() : nav.reverse();

      // Toggle class to detect oncroll
      self.direction === 1
        ? $("header .header-wrapper__top").addClass("navbar--scroll")
        : "";
      self.progress === 0
        ? $("header .header-wrapper__top").removeClass("navbar--scroll")
        : "";
    }
  });
}

function counterOnScroll() {
  var winHeight = $(window).height(),
    eleOffsetTop = $(".section-portfolio").offset().top,
    eleTop = eleOffsetTop - winHeight,
    current = 0;
  $(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop();

    if (current == 0 && scrollTop >= eleTop) {
      $(".section-portfolio .number").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");

        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo
          },

          {
            duration: 4000,
            easing: "linear",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            }
          }
        );
      });
    }
  });
}
