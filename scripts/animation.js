gsap.core.globals("ScrollTrigger", ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

const fadeIn = document.querySelectorAll(".fade-in")
if (fadeIn) {
    fadeIn.forEach(value => {
        const $delay = value.getAttribute("data-delay") ? value.getAttribute("data-delay") : 0

        gsap.fromTo(value, {
            autoAlpha: 0,
        }, {
            autoAlpha    : 1,
            ease         : "power1.inOut",
            duration     : 1.5,
            delay        : $delay,
            scrollTrigger: {
                trigger      : value,
                start        : "top 90%",
                toggleActions: "play none none none"
            }
        })
    })
}

const fadeInLeft = document.querySelectorAll(".fade-in-left")
if (fadeInLeft) {
    fadeInLeft.forEach(value => {
        const $delay = value.getAttribute("data-delay") ? value.getAttribute("data-delay") : 0

        gsap.fromTo(value, {
            autoAlpha: 0,
            x        : "-=30",
        }, {
            autoAlpha    : 1,
            x            : "+=30",
            ease         : "power1.inOut",
            duration     : 1.5,
            delay        : $delay,
            scrollTrigger: {
                trigger      : value,
                start        : "top 90%",
                toggleActions: "play none none none"
            }
        })
    })
}

const fadeInRight = document.querySelectorAll(".fade-in-right")
if (fadeInRight) {
    fadeInRight.forEach(value => {
        const $delay = value.getAttribute("data-delay") ? value.getAttribute("data-delay") : 0

        gsap.fromTo(value, {
            autoAlpha: 0,
            x        : "+=30",
        }, {
            autoAlpha    : 1,
            x            : "-=30",
            ease         : "power1.inOut",
            duration     : 1.5,
            delay        : $delay,
            scrollTrigger: {
                trigger      : value,
                start        : "top 90%",
                toggleActions: "play none none none"
            }
        })
    })
}

const fadeInDown = document.querySelectorAll(".fade-in-down")
if (fadeInDown) {
    fadeInDown.forEach(value => {
        const $delay = value.getAttribute("data-delay") ? value.getAttribute("data-delay") : 0

        gsap.fromTo(value, {
            autoAlpha: 0,
            y        : "-=30"
        }, {
            autoAlpha    : 1,
            y            : "+=30",
            ease         : "power1.inOut",
            duration     : 1.5,
            delay        : $delay,
            scrollTrigger: {
                trigger      : value,
                start        : "top 90%",
                toggleActions: "play none none none"
            }
        })
    })
}

const fadeInUp = document.querySelectorAll(".fade-in-up")
if (fadeInUp) {
    fadeInUp.forEach(value => {
        const $delay = value.getAttribute("data-delay") ? value.getAttribute("data-delay") : 0

        gsap.fromTo(value, {
            autoAlpha: 0,
            y        : "+=30",
        }, {
            autoAlpha    : 1,
            y            : "-=30",
            ease         : "power1.inOut",
            duration     : 1.5,
            delay        : $delay,
            scrollTrigger: {
                trigger      : value,
                start        : "top 90%",
                toggleActions: "play none none none"
            }
        })
    })
}

const revealTexts = document.querySelectorAll(".reveal-text")
if (revealTexts) {
    revealTexts.forEach(value => {
        const $text = value.querySelector(".reveal")

        gsap.to($text, {
            duration     : 1,
            y            : 0,
            ease         : "sine.out",
            scrollTrigger: {
                trigger      : value,
                start        : "top 80%",
                toggleActions: "play none none none"
            }
        })
    })
}