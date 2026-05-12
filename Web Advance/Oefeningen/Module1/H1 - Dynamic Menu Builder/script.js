'use strict';

// Select the menu and all headings
const menu = document.getElementById('mainMenu');
const headings = document.querySelectorAll('.content h1, .content h2');

// Create the main list
const mainList = document.createElement('ul');

let currentSubList = null;

// Loop over all headings
for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];

    // Give every heading an id
    heading.id = 'section-' + i;

    // Create menu item
    const listItem = document.createElement('li');
    const link = document.createElement('a');

    link.textContent = heading.textContent;
    link.href = '#' + heading.id;

    // Scroll to the correct heading
    link.addEventListener('click', function (event) {
        event.preventDefault();

        heading.scrollIntoView({
            behavior: 'smooth'
        });

        // Remove active class from all links
        const allLinks = document.querySelectorAll('#mainMenu a');

        for (let j = 0; j < allLinks.length; j++) {
            allLinks[j].classList.remove('active');
        }

        // Add active class to clicked link
        link.classList.add('active');
    });

    listItem.appendChild(link);

    // If it is an h1, add it as main item
    if (heading.tagName === 'H1') {
        currentSubList = document.createElement('ul');
        currentSubList.classList.add('submenu');

        // Open or close submenu when clicking h1
        link.addEventListener('click', function () {
            currentSubList.classList.toggle('open');
        });

        listItem.appendChild(currentSubList);
        mainList.appendChild(listItem);
    }

    // If it is an h2, add it under the last h1
    if (heading.tagName === 'H2' && currentSubList !== null) {
        currentSubList.appendChild(listItem);
    }
}

// Add the menu to the nav
menu.appendChild(mainList);