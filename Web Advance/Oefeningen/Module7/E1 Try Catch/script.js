'use strict';

const button = document.getElementById('fetchButton');
const result = document.getElementById('result');

const fetchData = async () => {

    try {

        const response =
            await fetch('https://jsonplaceholder.typicode.com/todos/1');

        if (!response.ok) {
            throw new Error('Fout bij ophalen');
        }

        const data = await response.json();

        result.textContent = `✅ ${data.title}`;

    } catch(error) {

        result.textContent = `❌ ${error.message}`;
    }
};

button.addEventListener('click', fetchData);
