(() => {
    const preloadElements = document.querySelectorAll('.project-preload');
    const slider = document.querySelector('.project-slider');
    let currentIndex = 0;

    const updateSliderPosition = () => {
        const containerWidth = slider.clientWidth;
        slider.style.transform = `translateX(-${currentIndex * containerWidth}px)`;
        document.getElementById('prev-project').disabled = currentIndex === 0;
        document.getElementById('next-project').disabled = currentIndex === preloadElements.length - 1;
    };

    preloadElements.forEach(el => {
        const path = el.dataset.tab;

        fetch(path)
        .then(res => res.text())
        .then(html => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('project-slide');
            wrapper.innerHTML = html;
            slider.appendChild(wrapper);

            // Add animation on project load
            setTimeout(() => {
                wrapper.classList.add('show');
            }, 100);
        })
        .catch(err => {
            console.error(`Failed to load project at ${path}:`, err);
        });
    });

    document.getElementById('prev-project').addEventListener('click', () => {
        if (currentIndex > 0) currentIndex--;
        updateSliderPosition();
    });

    document.getElementById('next-project').addEventListener('click', () => {
        if (currentIndex < preloadElements.length - 1) currentIndex++;
        updateSliderPosition();
    });

    updateSliderPosition();
})();
