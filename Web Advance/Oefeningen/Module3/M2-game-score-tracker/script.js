'use strict';

let scores = [];

const verwerkScore = (
    naam = 'Onbekend',
    score = 0
) => {

    if (naam.trim() === '') {
        naam = 'Onbekend';
    }

    if (isNaN(score)) {
        score = 0;
    }

    return {
        naam: naam,
        score: score
    };
};

const voegScoreToe = () => {

    const naamInput =
        document.getElementById('playerName').value;

    const scoreInput = Number(
        document.getElementById('score').value
    );

    const speler = verwerkScore(
        naamInput,
        scoreInput
    );

    scores.push(speler);

    toonScores();
};

const toonScores = () => {

    const scoreBoard =
        document.getElementById('scoreBoard');

    scoreBoard.innerHTML = '';

    for (let speler of scores) {

        scoreBoard.innerHTML += `
            <p>
                ${speler.naam}: ${speler.score}
            </p>
        `;
    }
};
