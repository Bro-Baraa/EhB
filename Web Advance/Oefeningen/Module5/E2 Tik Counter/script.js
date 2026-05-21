const counter = document.querySelector('.counter');
const button = document.getElementById('clickButton');
const message = document.querySelector('.message');

let clicks = 0;

button.addEventListener('click', function () {
    clicks++;
    counter.textContent = clicks;

    if (clicks === 5) {
        message.textContent = 'Proficiat!';
        button.disabled = true;
    }
});
