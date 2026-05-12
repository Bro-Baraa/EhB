'use strict';

const grid = document.getElementById('grid');

const redCount = document.getElementById('redCount');
const blueCount = document.getElementById('blueCount');
const greenCount = document.getElementById('greenCount');

// Create 25 cells
for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // Change to red when mouse goes over the cell
    cell.addEventListener('pointerover', function () {
        cell.style.backgroundColor = 'red';
        updateCounts();
    });

    // Change to blue when the cell is clicked
    cell.addEventListener('click', function () {
        cell.style.backgroundColor = 'blue';
        updateCounts();
    });

    // Change to green when the cell is double clicked
    cell.addEventListener('dblclick', function () {
        cell.style.backgroundColor = 'green';
        updateCounts();
    });

    grid.appendChild(cell);
}

// Count the cells by color
function updateCounts() {
    const cells = document.querySelectorAll('.cell');

    let red = 0;
    let blue = 0;
    let green = 0;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].style.backgroundColor === 'red') {
            red++;
        } else if (cells[i].style.backgroundColor === 'blue') {
            blue++;
        } else if (cells[i].style.backgroundColor === 'green') {
            green++;
        }
    }

    redCount.textContent = red;
    blueCount.textContent = blue;
    greenCount.textContent = green;
}