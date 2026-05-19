'use strict';

const maakTweet = text => {
    return text.slice(0, 50);
};

const maakPost = text => {
    return text.toUpperCase();
};

const combineerBericht = text => {
    return `${maakTweet(text)} | ${maakPost(text)}`;
};

const formatText = () => {

    const text = document.getElementById('inputText').value;

    document.getElementById('tweetOutput').textContent =
        `Tweet: ${maakTweet(text)}`;

    document.getElementById('postOutput').textContent =
        `Post: ${maakPost(text)}`;

    document.getElementById('comboOutput').textContent =
        combineerBericht(text);
};
