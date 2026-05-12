'use strict';

// Select all elements with the class special
const specialElements = document.getElementsByClassName('special');

// Make all special elements red
for (let i = 0; i < specialElements.length; i++) {
    specialElements[i].style.color = 'red';
}

// Select the second paragraph
const secondParagraph = document.querySelector('.container p:nth-of-type(2)');

// Underline the second paragraph
secondParagraph.style.textDecoration = 'underline';

// Select the output div
const output = document.getElementById('output');

// Show the number of special elements
output.textContent = 'Number of special elements: ' + specialElements.length;