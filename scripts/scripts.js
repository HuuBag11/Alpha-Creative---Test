"use strict";
$ = jQuery;

$(document).ready(function () {
  slideBanner();
  scrollHeader();
  $(window).on("scroll", counterOnScroll);
  activeNavLink();
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
      autoplay: true,
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

var counted = 0;
function counterOnScroll() {
  var oTop = $(".section-portfolio").offset().top - window.innerHeight;
  if (counted == 0 && $(window).scrollTop() > oTop) {
    $(".section-portfolio .number").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
        
      $({
        countNum: $this.text()
      }).animate(
        {
          countNum: countTo
        },

        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {     
            $this.text($this.attr("data-count"));
            //alert('finished');
          }
        }
      );
    });
    counted = 1;
  }
};

function activeNavLink() {
  let sections = document.querySelectorAll('section');
  const headerHeight = document.querySelector('header').offsetHeight;

  window.onscroll = () => {
    let fromTop = window.scrollY + window.innerHeight / 2;

      sections.forEach(sec => {
          let sectionTop = sec.offsetTop;
          let sectionHeight = sec.offsetHeight;
          let id = sec.getAttribute('id');

          if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
              let targetNavLink;
              let targetPopupLink;
              
              if (id === 'sectionHome') {
                  targetNavLink = document.querySelector('header .menu-list a[href="#"]');

              } else {
                  targetNavLink = document.querySelector(`header .menu-list a[href="#${id}"]`);
                  targetPopupLink = document.querySelector(`#menu-popup a[href="#${id}"]`);
              }

              if (targetNavLink) {
                  let parentMenuItem = targetNavLink.closest('header .menu-list__item');
                  
                  if (parentMenuItem) {
                      document.querySelectorAll('header .menu-list__item').forEach(item => {
                          item.classList.remove('active');
                      });

                      parentMenuItem.classList.add('active');
                  }
              }

              if (targetPopupLink) {
                  let parentMenuPopup = targetPopupLink.closest("li");
                  
                  if (parentMenuPopup) {
                      parentMenuPopup = parentMenuPopup.querySelector("a");

                      document.querySelectorAll('#menu-popup li a').forEach(item => {
                          item.classList.remove('active');
                      });

                      parentMenuPopup.classList.add('active');
                  }
              }
          }
      });
  };

  document.querySelectorAll('header .menu-list a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
}
