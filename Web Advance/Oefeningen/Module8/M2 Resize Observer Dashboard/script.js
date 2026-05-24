'use strict';

const container = document.getElementById('container');
const dashboard = document.getElementById('dashboard');
const currentWidth = document.getElementById('current-width');
const columnCount = document.getElementById('column-count');

const resizeObserver = new ResizeObserver(entries => {

    for (let entry of entries) {

        const width = Math.round(entry.contentRect.width);

        currentWidth.textContent = width;

        if (width < 500) {

            dashboard.dataset.columns = '1';

            columnCount.textContent = '1';

        } else if (width < 850) {

            dashboard.dataset.columns = '2';

            columnCount.textContent = '2';

        } else {

            dashboard.dataset.columns = '3';

            columnCount.textContent = '3';
        }
    }
});

resizeObserver.observe(container);
