const swiper = new Swiper(".swiper-container", {
    slidesPerView: 4, // Show 4 items per slide
    spaceBetween: 20, // Space between slides
    loop: true, // Enable infinite loop
    autoplay: {
        delay: 3000, // Auto slide every 3 seconds
        disableOnInteraction: false, // Keep autoplay after user interaction
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        // Adjust the number of visible slides at different screen widths
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
    },
});
