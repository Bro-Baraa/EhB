'use strict';

let speler = null;

const maakSpeler = (
    naam = 'Player 1'
) => {

    return {
        naam: naam,
        level: 1,
        health: 100
    };
};

const doeSchade = (
    speler,
    schade
) => {

    speler.health -= schade;

    if (speler.health < 0) {
        speler.health = 0;
    }
};

const levelOmhoog = speler => {

    speler.level++;
    speler.health = 100;
};

const maakNieuweSpeler = () => {

    const naam =
        document.getElementById('playerName').value;

    speler = maakSpeler(naam);

    toonSpeler();
};

const doeSchadeBijSpeler = () => {

    if (speler) {

        doeSchade(speler, 25);

        toonSpeler();
    }
};

const levelSpelerOp = () => {

    if (speler) {

        levelOmhoog(speler);

        toonSpeler();
    }
};

const toonSpeler = () => {

    const playerStats =
        document.getElementById('playerStats');

    playerStats.innerHTML = `
        <h2>${speler.naam}</h2>

        <p>Level: ${speler.level}</p>

        <p>Health: ${speler.health}</p>
    `;
};
