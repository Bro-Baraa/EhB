'use strict';

const button = document.getElementById('getWeather');
const loader = document.getElementById('loader');
const weatherData = document.getElementById('weather-data');
const cachedNotice = document.getElementById('cached-notice');

const API_KEY = 'YOUR_API_KEY_HERE';

const savedWeather = localStorage.getItem('weather');

if (savedWeather !== null) {

    const data = JSON.parse(savedWeather);

    showWeather(data);

    cachedNotice.textContent = 'Oude data uit localStorage.';
}

button.addEventListener('click', () => {

    loader.style.display = 'block';

    navigator.geolocation.getCurrentPosition(
        position => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeather(lat, lon);
        },
        () => {

            loader.style.display = 'none';

            weatherData.innerHTML =
                '<p>Locatie kon niet opgehaald worden.</p>';
        }
    );
});

async function getWeather(lat, lon) {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Weather data not found');
        }

        const data = await response.json();

        localStorage.setItem('weather', JSON.stringify(data));

        showWeather(data);

        cachedNotice.textContent = 'Nieuwe data opgehaald.';

    } catch (error) {

        weatherData.innerHTML =
            `<p>${error.message}</p>`;

    } finally {

        loader.style.display = 'none';
    }
}

function showWeather(data) {

    weatherData.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperatuur: ${data.main.temp}°C</p>
        <p>Weer: ${data.weather[0].description}</p>
    `;
}
