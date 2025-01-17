async function generateSlides() {
    const swiperWrapper = document.querySelector('#guru-slider');
    
    // Fetch the teacher data from the server
    teachers = await getGuru();

    // Clear the swiperWrapper before adding new slides to avoid duplication
    swiperWrapper.innerHTML = '';

    // Loop through the teachers array and create slides dynamically
    teachers.forEach(teacher => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide', 'text-center');

        // Create image and name elements
        const img = document.createElement('img');
        img.setAttribute('alt', 'Teacher image ' + teacher.image);
        img.setAttribute('src', "http://localhost:8000/storage/guru/" + teacher.image);
        img.classList.add('w-32', 'border-4', 'border-white', 'h-32', 'rounded-full', 'mx-auto');

        const name = document.createElement('p');
        name.classList.add('mt-2', 'text-2xl');
        name.textContent = teacher.name;

        // Append the image and name to the slide
        slide.appendChild(img);
        slide.appendChild(name);

        // Append the slide to the swiper-wrapper
        swiperWrapper.appendChild(slide);
    });

    // Now initialize Swiper after the slides are created
    const swiper = new Swiper('.swiper-container', {
        // Add your swiper configurations here
        loop: true, // Example of a setting
        slidesPerView: 4,
        spaceBetween: 10,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
}

// Call the function to generate slides
generateSlides();
