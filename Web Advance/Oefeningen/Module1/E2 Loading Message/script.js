'use strict';

// Select the loading message
const loadingMessage = document.getElementById('loadingMessage');

// Wait until the whole page is loaded
window.addEventListener('load', function () {

    // Change the text
    loadingMessage.textContent = 'Welcome!';

    // Hide the message after 2 seconds
    setTimeout(function () {
        loadingMessage.style.display = 'none';
    }, 2000);

});