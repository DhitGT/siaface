document.addEventListener("DOMContentLoaded", async function () {
    // Array of items to be dynamically inserted
    let items = [
        {
            title: 'Siswi Kelas XII Rekayasa Perangkat Lunak Unggulan Meraih Score TOEIC Tertinggi di ajang SMK Award Jabar',
            description: 'Alhamdulillah...anak Bantargebang Bekasi ada yang berprestasi dan mengharumkan nama Kota Bekasi di Tingkat Provinsi Jawa Barat...',
            image: 'https://www.smkn2kotabekasi.sch.id/assets/upload/image/Green-Organic-Warm-Food-and-Restaurant-Bio-Link-Website.png'
        },
        {
            title: 'SISWA SMKN2 KOTA BEKASI MENJUARAI LOMBA SKATEBOARD PADA KEJUARAN PIALA GUBERNUR PELAJAR JUARA 2022',
            description: 'Dinas Pendidikan Provinsi Jawa Barat melalui UPTD Tikomdik Dinas Pendidikan Provinsi Jawa Barat telah menggelar kegiatan " Awarding Day Piala Gubernur Pelajar Juara 2022 "...',
            image: 'https://www.smkn2kotabekasi.sch.id/assets/upload/image/WhatsApp-Image-2022-10-03-at-11.37.45-AM.jpeg'
        },
        {
            title: 'New Event: Tech Conference 2025',
            description: 'Join us for the biggest tech event of the year. Learn about the future of technology from industry leaders.',
            image: 'https://example.com/event-image.jpg'
        },
        {
            title: 'Sports Day Highlights',
            description: 'Our students showcased their talents in a series of exciting sports activities. Check out the highlights.',
            image: 'https://example.com/sports-day.jpg'
        }
    ];

    // Get the container to hold the dynamic content
    const container = document.querySelector('#dynamicContentBerita');

    // Create the HTML elements for all items, but hide them initially
    items.forEach(item => {
        const aTag = document.createElement('a');
        aTag.href = "#";
        aTag.classList.add('flex','bg-red-700', 'items-start', 'justify-start', 'text-start', 'min-h-64', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'md:flex-row', 'hover:bg-gray-100');
        aTag.style.backgroundColor = 'rgba(0, 0, 0, 0.11)';
        aTag.style.backdropFilter = 'blur(5px)';
        aTag.style.display = 'none'; // Initially hide all items

        const divTag = document.createElement('div');
        divTag.classList.add('flex', 'flex-col', 'justify-between', 'p-4', 'leading-normal');

        const h5Tag = document.createElement('h5');
        h5Tag.classList.add('mb-2', 'text-2xl', 'font-bold', 'tracking-tight', 'text-gray-100');
        h5Tag.textContent = item.title;

        const pTag = document.createElement('p');
        pTag.classList.add('mb-3', 'font-normal', 'text-justify', 'text-gray-200');
        pTag.textContent = item.description;

        divTag.appendChild(h5Tag);
        divTag.appendChild(pTag);

        const imgTag = document.createElement('img');
        imgTag.classList.add('border-2', 'border-white', 'object-cover', 'w-64', 'h-full', 'rounded-t-lg', 'md:w-64', 'md:h-full', 'md:rounded-lg');
        imgTag.style.aspectRatio = '1';
        imgTag.src = "http://localhost:8000/storage/" + item.cover;
        imgTag.alt = '';

        aTag.appendChild(divTag);
        aTag.appendChild(imgTag);

        // Append the created <a> tag to the container
        container.appendChild(aTag);
    });

    let currentIndex = 0;
    const showNextItems = () => {
        const allItems = container.querySelectorAll('a');
        
        // Hide all items first
        allItems.forEach(item => item.style.display = 'none');
        
        // Show two items starting from currentIndex
        for (let i = 0; i < 2; i++) {
            const index = currentIndex + i;
            if (allItems[index]) {
                allItems[index].style.display = 'block';
            }
        }

        // Move to the next two items for the next interval
        currentIndex = (currentIndex + 2) % items.length;
    };

    // Show the first two items
    showNextItems();

    // Set interval to alternate between two items every 10 seconds
    setInterval(showNextItems, 10000); // 10000ms = 10 seconds
});
