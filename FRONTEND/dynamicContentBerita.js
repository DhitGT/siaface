document.addEventListener("DOMContentLoaded", async function () {
    // Array of items to be dynamically inserted
    let items = await getBerita();

    // Get the container to hold the dynamic content
    const container = document.querySelector('#dynamicContentBerita');

    // Create the HTML elements for all items, but hide them initially
    items.forEach(item => {
        const aTag = document.createElement('div');

        aTag.classList.add(
            'beritaCard',
            'flex',
            'items-start',
            'justify-start',
            'text-start',
            'min-h-64',
            'border',
            'border-gray-200',
            'rounded-lg',
            'shadow',
            'md:flex-row',
            'hover:bg-gray-100',
            'opacity-0', // Initially hidden
            'transition-opacity', // Add transition
            'duration-500' // Duration of fade effect (0.5 seconds)
        );
        aTag.style.backgroundColor = 'rgba(0, 0, 0, 0.11)';
        aTag.style.backdropFilter = 'blur(5px)';
        aTag.style.display = 'none'; // Initially hide all items

        const divTag = document.createElement('div');
        divTag.classList.add('flex', 'flex-col', 'justify-between', 'p-4', 'leading-normal');

        const h5Tag = document.createElement('h5');
        h5Tag.classList.add('mb-2', 'text-4xl', 'font-bold', 'tracking-tight', 'text-gray-100');
        h5Tag.textContent = item.title;

        const pTag = document.createElement('p');
        pTag.classList.add('mb-3', 'font-normal', 'text-2xl', 'text-justify', 'text-gray-200');
        pTag.textContent = item.content;

        divTag.appendChild(h5Tag);
        divTag.appendChild(pTag);

        const imgTag = document.createElement('img');
        imgTag.classList.add('border-2', 'border-white', 'ms-auto', 'object-cover', 'w-64', 'h-full', 'rounded-t-lg', 'md:w-64', 'md:h-full', 'md:rounded-lg');
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
        const allItems = container.querySelectorAll('.beritaCard');

        // Hide all items first
        allItems.forEach(item => {
            item.style.opacity = '0'; // Start fade-out
            setTimeout(() => {
                item.style.display = 'none';
            }, 500); // Match the fade-out duration
        });

        // Show two items starting from currentIndex
        for (let i = 0; i < 2; i++) {
            const index = currentIndex + i;
            if (allItems[index]) {
                setTimeout(() => {
                    allItems[index].style.display = 'flex';
                    setTimeout(() => {
                        allItems[index].style.opacity = '1'; // Fade-in effect
                    }, 50); // Delay to ensure `display` is applied
                }, 500); // Delay to match fade-out duration
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
