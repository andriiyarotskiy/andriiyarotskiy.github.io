$(document).ready(function () {
    $(".slider-section-3").owlCarousel({
        dots: true,
        items: 3,
        loop: true,
        autoplay: true, //Автозапуск слайдера
        smartSpeed: 1000, //Время движения слайда
        autoplayTimeout: 4000, //Время смены слайда
        responsive: {
            0: {
                items:2
            },
            576: {
                items:3
            },
            768: {
                items:4
            },
            992: {
                items:3
            },
        }
    });


    $(".slider-section-5").owlCarousel({
        dots: true,
        items: 4,
        loop: true,
        autoplay: true, //Автозапуск слайдера
        smartSpeed: 1000, //Время движения слайда
        autoplayTimeout: 4000, //Время смены слайда
        responsive: {
            0: {
                items:1
            },
            576: {
                items:2
            },
            768: {
                items:3
            },
            992: {
                items:4
            },
        }
    });
});

// slider