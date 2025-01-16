let teachers = [
    { name: 'RAMDANI, S.Kom', image: '/images/guru/RAMDANI,S.Kom.JPG' },
    { name: 'HANUJI, S.Kom.', image: '/images/guru/HANUJI, S.Kom..JPG' },
    { name: 'DEDDY MARYANTO, S.Kom', image: '/images/guru/Deddy Maryanto, S.Kom.jpg' },
    { name: 'WENDY HADITTIA, S.Kom', image: '/images/guru/WENDY HADITTIA, S.Kom.JPG' },
    { name: 'Dra.SUWARNI', image: '/images/guru/Dra.SUWARNI.JPG' },
    { name: 'RIVAN PRASETIA, S.Kom', image: '/images/guru/RIVAN PRASETIA, S.Kom.JPG' },
    { name: 'Kusariwati, M.Pd', image: '/images/guru/Kusariwati, M.Pd.jpg' },
    { name: 'ATIK SUGIATI, S.Kom', image: '/images/guru/ATIK SUGIATI, S.Kom.JPG' }
  ];

  // Function to generate the slides
  async function generateSlides() {
    const swiperWrapper = document.querySelector('#guru-slider');


    teachers = await getGuru()
    
    // Loop through the teachers array and create slides dynamically
    teachers.forEach(teacher => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide', 'text-center');

      // Create image and name elements
      const img = document.createElement('img');
      img.setAttribute('alt', 'Teacher image' + teacher.image);
      img.setAttribute('src', "http://localhost:8000/storage/guru/"+teacher.image);
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
  }

  // Call the function to generate slides
  generateSlides();