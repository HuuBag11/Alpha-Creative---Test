"use strict";
$ = jQuery;

$(document).ready(function(){
    slideBanner();
})

function slideBanner(){
    let slidebanner = $(".section-banner__slide");
    console.log(slideBanner.length);
    
    if(slideBanner.length){
        console.log("hii");
        
        new Splide(slidebanner[0], {
            type: 'loop',
            perPage: 1,
            interval: 6000,
            arrows:false,
            paginations: false,
            autoplay: true,
            speed: 2000,
            pauseOnHover: true,
            pauseonFocus: true,
        }).mount();
    }
}