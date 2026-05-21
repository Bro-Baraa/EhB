const startButton = document.getElementById('startButton');

startButton.addEventListener('click', function () {
    document.body.style.backgroundColor = 'white';

    setTimeout(function () {
        document.body.style.backgroundColor = 'red';
    }, 1000);

    setTimeout(function () {
        document.body.style.backgroundColor = 'green';
    }, 2000);

    setTimeout(function () {
        document.body.style.backgroundColor = 'blue';
    }, 3000);
});
