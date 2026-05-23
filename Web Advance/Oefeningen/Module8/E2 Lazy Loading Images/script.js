'use strict';

const images = document.querySelectorAll('.lazy-image');

const observer = new IntersectionObserver(entries => {

    for (let entry of entries) {

        if (entry.isIntersecting) {

            const image = entry.target;

            image.src = image.dataset.src;

            observer.unobserve(image);
        }
    }

}, {
    rootMargin: '100px'
});

for (let image of images) {
    observer.observe(image);
}
