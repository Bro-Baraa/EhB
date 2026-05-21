const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherDisplay = document.getElementById('weather-display');
const favoritesList = document.getElementById('favorites-list');

let laatsteWeer = null;
let gebruikFahrenheit = false;
let favorieten = ['Brussels', 'Antwerp'];

searchButton.addEventListener('click', function () {
    zoekStad(cityInput.value);
});

cityInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        zoekStad(cityInput.value);
    }
});

toonFavorieten();

function zoekStad(stad) {
    stad = stad.trim();

    if (stad === '') {
        weatherDisplay.innerHTML = '<div class="error">Vul eerst een stad in.</div>';
        return;
    }

    weatherDisplay.innerHTML = '<div class="loading">Weer wordt geladen...</div>';

    const geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(stad) + '&count=1&language=nl&format=json';

    fetch(geoUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Locatie zoeken mislukt');
            }
            return response.json();
        })
        .then(function (data) {
            if (!data.results || data.results.length === 0) {
                throw new Error('Stad niet gevonden');
            }

            const plaats = data.results[0];
            return haalWeerOp(plaats);
        })
        .catch(function () {
            weatherDisplay.innerHTML = '<div class="error">De stad kon niet gevonden worden.</div>';
        });
}

function haalWeerOp(plaats) {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + plaats.latitude + '&longitude=' + plaats.longitude + '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=sunrise,sunset&timezone=auto';

    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Weer ophalen mislukt');
            }
            return response.json();
        })
        .then(function (weer) {
            laatsteWeer = {
                stad: plaats.name,
                land: plaats.country,
                temperatuur: weer.current.temperature_2m,
                vochtigheid: weer.current.relative_humidity_2m,
                wind: weer.current.wind_speed_10m,
                code: weer.current.weather_code,
                zonsopgang: weer.daily.sunrise[0],
                zonsondergang: weer.daily.sunset[0]
            };

            gebruikFahrenheit = false;
            toonWeer();
        })
        .catch(function () {
            weatherDisplay.innerHTML = '<div class="error">Het weer kon niet geladen worden.</div>';
        });
}

function toonWeer() {
    if (laatsteWeer === null) return;

    let temperatuur = laatsteWeer.temperatuur;
    let teken = '°C';

    if (gebruikFahrenheit) {
        temperatuur = temperatuur * 9 / 5 + 32;
        teken = '°F';
    }

    weatherDisplay.innerHTML =
        '<div class="weather-card">' +
        '<h2>' + laatsteWeer.stad + ', ' + laatsteWeer.land + '</h2>' +
        '<p>Temperatuur: ' + temperatuur.toFixed(1) + teken + '</p>' +
        '<p>Beschrijving: ' + beschrijving(laatsteWeer.code) + '</p>' +
        '<p>Luchtvochtigheid: ' + laatsteWeer.vochtigheid + '%</p>' +
        '<p>Windsnelheid: ' + laatsteWeer.wind + ' km/u</p>' +
        '<p>Zonsopgang: ' + maakTijd(laatsteWeer.zonsopgang) + '</p>' +
        '<p>Zonsondergang: ' + maakTijd(laatsteWeer.zonsondergang) + '</p>' +
        '<button id="temp-knop">Wissel Celsius/Fahrenheit</button> ' +
        '<button id="favoriet-knop">Voeg toe aan favorieten</button>' +
        '</div>';

    document.getElementById('temp-knop').addEventListener('click', function () {
        gebruikFahrenheit = !gebruikFahrenheit;
        toonWeer();
    });

    document.getElementById('favoriet-knop').addEventListener('click', function () {
        voegFavorietToe(laatsteWeer.stad);
    });
}

function beschrijving(code) {
    if (code === 0) return 'Heldere lucht';
    if (code === 1 || code === 2 || code === 3) return 'Bewolkt';
    if (code === 45 || code === 48) return 'Mist';
    if (code >= 51 && code <= 67) return 'Regen';
    if (code >= 71 && code <= 77) return 'Sneeuw';
    if (code >= 80 && code <= 82) return 'Buien';
    if (code >= 95) return 'Onweer';
    return 'Onbekend weer';
}

function maakTijd(waarde) {
    const datum = new Date(waarde);
    return datum.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' });
}

function voegFavorietToe(stad) {
    if (!favorieten.includes(stad)) {
        favorieten.push(stad);
        toonFavorieten();
    }
}

function toonFavorieten() {
    favoritesList.innerHTML = '';

    for (let i = 0; i < favorieten.length; i++) {
        const div = document.createElement('div');
        div.className = 'favorite-item';
        div.textContent = favorieten[i];

        div.addEventListener('click', function () {
            cityInput.value = favorieten[i];
            zoekStad(favorieten[i]);
        });

        favoritesList.appendChild(div);
    }
}
