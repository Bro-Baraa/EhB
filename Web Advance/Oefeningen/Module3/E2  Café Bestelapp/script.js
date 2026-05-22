'use strict';

const maakBestelling = (
    drank = 'cola',
    snack = 'chips'
) => {
    return {
        drank: drank,
        snack: snack,
        tijd: new Date().toLocaleTimeString()
    };
};

const bestelling1 = maakBestelling();
const bestelling2 = maakBestelling('fanta');
const bestelling3 = maakBestelling('sprite', 'nootjes');

const output = document.getElementById('output');

output.innerHTML += `<p>Bestelling 1: ${bestelling1.drank} + ${bestelling1.snack}</p>`;
output.innerHTML += `<p>Bestelling 2: ${bestelling2.drank} + ${bestelling2.snack}</p>`;
output.innerHTML += `<p>Bestelling 3: ${bestelling3.drank} + ${bestelling3.snack}</p>`;
