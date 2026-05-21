const startButton = document.getElementById('startButton');
const cancelButton = document.getElementById('cancelButton');
const timerDisplay = document.getElementById('timerDisplay');
const message = document.getElementById('message');
const secondsInput = document.getElementById('seconds');

let geannuleerd = false;
let interval;

function startTimer(seconds) {
    return new Promise(function (resolve, reject) {
        let teller = seconds;
        timerDisplay.textContent = teller;

        interval = setInterval(function () {
            if (geannuleerd) {
                clearInterval(interval);
                reject('Timer geannuleerd');
                return;
            }

            teller--;
            timerDisplay.textContent = teller;

            if (teller === 0) {
                clearInterval(interval);
                resolve('Timer klaar');
            }
        }, 1000);
    });
}

startButton.addEventListener('click', function () {
    const seconden = Number(secondsInput.value);

    if (seconden <= 0) {
        message.textContent = 'Geef een geldig aantal seconden.';
        return;
    }

    geannuleerd = false;
    message.textContent = '';
    startButton.disabled = true;
    cancelButton.disabled = false;

    startTimer(seconden)
        .then(function (tekst) {
            message.textContent = tekst;
        })
        .catch(function (fout) {
            message.textContent = fout;
        })
        .finally(function () {
            startButton.disabled = false;
            cancelButton.disabled = true;
        });
});

cancelButton.addEventListener('click', function () {
    geannuleerd = true;
});
