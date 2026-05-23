'use strict';

const button = document.getElementById('themeToggle');

let savedTheme = localStorage.getItem('theme');

if (savedTheme === null) {
    savedTheme = 'light-theme';
}

document.body.className = savedTheme;

updateButtonText();

button.addEventListener('click', () => {

    if (document.body.classList.contains('light-theme')) {

        document.body.className = 'dark-theme';

        localStorage.setItem('theme', 'dark-theme');

    } else {

        document.body.className = 'light-theme';

        localStorage.setItem('theme', 'light-theme');
    }

    updateButtonText();
});

function updateButtonText() {

    if (document.body.classList.contains('dark-theme')) {
        button.textContent = 'Schakel naar Licht Thema';
    } else {
        button.textContent = 'Schakel naar Donker Thema';
    }
}
