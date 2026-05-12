'use strict';

// Ask the user for their name
let userName = prompt('What is your name?');

// Variable to store the score
let score = 0;

// Question 1
let answer1 = prompt('Which language is used for web pages?');

if (answer1.toLowerCase() === 'javascript') {
    alert('Good job!');
    score++;
} else {
    alert('Correct answer: JavaScript');
}

// Question 2
let answer2 = prompt('What does CSS stand for?');

if (answer2.toLowerCase() === 'cascading style sheets') {
    alert('Good job!');
    score++;
} else {
    alert('Correct answer: Cascading Style Sheets');
}

// Question 3
let answer3 = prompt('Which HTML tag is used for a paragraph?');

if (answer3.toLowerCase() === 'p') {
    alert('Good job!');
    score++;
} else {
    alert('Correct answer: p');
}

// Show final result
alert(`${userName}, your final score is ${score}/3`);