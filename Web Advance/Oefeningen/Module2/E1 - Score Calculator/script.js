'use strict';

let scores = [];

const scoreInput = document.getElementById('score');
const addScoreButton = document.getElementById('addScore');
const averageOutput = document.getElementById('average');
const highestOutput = document.getElementById('highest');
const scoreList = document.getElementById('scoreList');

// Add a new score when the button is clicked
addScoreButton.addEventListener('click', function () {
    const score = Number(scoreInput.value);

    if (score < 0 || score > 20 || scoreInput.value === '') {
        alert('Please enter a score between 0 and 20.');
        return;
    }

    scores.push(score);

    updateStats();
    showScores();

    scoreInput.value = '';
});

// Update average and highest score
function updateStats() {
    let total = 0;

    for (let score of scores) {
        total = total + score;
    }

    const average = total / scores.length;
    const highest = Math.max(...scores);

    averageOutput.textContent = average.toFixed(1);
    highestOutput.textContent = highest;
}

// Show all scores in the list
function showScores() {
    scoreList.innerHTML = '';

    for (let score of scores) {
        const listItem = document.createElement('li');
        listItem.textContent = score;
        scoreList.appendChild(listItem);
    }
}