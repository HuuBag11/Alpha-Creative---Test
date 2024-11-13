"use strict";
$ = jQuery;

$(document).ready(function () {
  slideBanner();
  scrollHeader();
  counterOnScroll();
  toggleSubmenuMoble();
});

function slideBanner() {
  let slideBanner = $(".section-banner__slide");

  const destroy = $(".section-banner__slide .splide__slide").length < 2

  if (slideBanner.length && !destroy) {
    let splideInstance = new Splide(slideBanner[0], {
      type: "slide",
      perPage: 1,
      interval: 6000,
      arrows: false,
      paginations: false,
      autoplay: false,
      speed: 2000,
      pauseOnHover: true,
      pauseonFocus: true,
      destroy: destroy
    }).mount();
  }
  else{
    if (slideBanner.splide) {
      slideBanner.splide.destroy();
    }
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

function counterOnScroll(){
  $(".number").each(function() {
    const $stat = $(this);
    const patt = /(\D+)?(\d+(\.\d+)?)(\D+)?/;
    const time = 0;
    let result = patt.exec($stat.text());
    let fresh = true;
    let ticks;
  
    if (!result) return;
  
    result.shift();
    result = result.filter(res => res != null);
  
    $stat.empty();
  
    result.forEach((res) => {
      if (isNaN(res)) {
        $stat.append(`<span>${res}</span>`);
      } else {
        for (let i = 0; i < res.length; i++) {
          $stat.append(`
            <span data-value="${res[i]}">
              <span>&nbsp;</span>
              ${Array(parseInt(res[i]) + 1)
                .join(0)
                .split(0)
                .map((x, j) => `<span>${j}</span>`)
                .join("")}
            </span>
          `);
        }
      }
    });
  
    ticks = $stat.find("span[data-value]");
  
    const activate = () => {
      const top = $stat[0].getBoundingClientRect().top;
      const offset = $(window).height() * 0.9;
  
      setTimeout(() => {
        fresh = false;
      }, time);
  
      if (top < offset) {
        setTimeout(
          () => {
            ticks.each(function() {
              const dist = parseInt($(this).attr("data-value")) + 1;
              $(this).css("transform", `translateY(-${dist * 100}%)`);
            });
          },
          fresh ? time : 0
        );
        $(window).off("scroll", activate);
      }
    };
    
    $(window).on("scroll", activate);
    activate();
  });
}

// function activeNavLink() {
//   let sections = document.querySelectorAll('section');
//   const headerHeight = document.querySelector('header').offsetHeight;

//   window.onscroll = () => {
//     let fromTop = window.scrollY + window.innerHeight / 2;

//       sections.forEach(sec => {
//           let sectionTop = sec.offsetTop;
//           let sectionHeight = sec.offsetHeight;
//           let id = sec.getAttribute('id');

//           if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
//               let targetNavLink;
//               let targetPopupLink;
              
//               if (id === 'sectionHome') {
//                   targetNavLink = document.querySelector('header .menu-list a[href="#"]');

//               } else {
//                   targetNavLink = document.querySelector(`header .menu-list a[href="#${id}"]`);
//                   targetPopupLink = document.querySelector(`#menu-popup a[href="#${id}"]`);
//               }

//               if (targetNavLink) {
//                   let parentMenuItem = targetNavLink.closest('header .menu-list__item');
                  
//                   if (parentMenuItem) {
//                       document.querySelectorAll('header .menu-list__item').forEach(item => {
//                           item.classList.remove('active');
//                       });

//                       parentMenuItem.classList.add('active');
//                   }
//               }

//               if (targetPopupLink) {
//                   let parentMenuPopup = targetPopupLink.closest("li");
                  
//                   if (parentMenuPopup) {
//                       parentMenuPopup = parentMenuPopup.querySelector("a");

//                       document.querySelectorAll('#menu-popup li a').forEach(item => {
//                           item.classList.remove('active');
//                       });

//                       parentMenuPopup.classList.add('active');
//                   }
//               }
//           }
//       });
//   };

//   document.querySelectorAll('header .menu-list a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();

//         const targetId = this.getAttribute('href');
//         const targetSection = document.querySelector(targetId);

//         if (targetSection) {
//             const targetPosition = targetSection.offsetTop - headerHeight;

//             window.scrollTo({
//                 top: targetPosition,
//                 behavior: 'smooth'
//             });
//         }
//     });
// });
// }

function togglePopupHeader(event){
  event.preventDefault();

  let btnHamburger = $("header .header-wrapper__hambuger");
  btnHamburger.toggleClass("is-active");

  $("body").toggleClass("overflow-hidden");

  let menuMobile = $("header .header-wrapper__bottom");
  menuMobile.toggleClass("show");
}


function toggleSubmenuMoble(){
  if($(window).width() > 768) return;

  $(".menu-list__item.menu-item-has-children .arrow").on("click", function(e){
    e.preventDefault();

    $(this).closest(".menu-item-has-children").find(".sub-menu");

    let submenu = $(this).closest(".menu-item-has-children").find(".sub-menu");
    submenu.toggleClass("open");
    
    if (submenu.hasClass("open")) {
      submenu.css("height", submenu.get(0).scrollHeight);  // Expand to natural height
    } else {
        submenu.css("height", 0);  // Collapse to height 0
    }
  })
}