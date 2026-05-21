const blocks = document.querySelectorAll('.block');
const startBtn = document.getElementById('startBtn');

function wacht(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

async function startLichtshow() {
    startBtn.disabled = true;

    for (let i = 0; i < blocks.length; i++) {
        const oudeKleur = blocks[i].style.backgroundColor;
        blocks[i].style.backgroundColor = 'white';

        await wacht(500);

        blocks[i].style.backgroundColor = oudeKleur;
    }

    await wacht(500);

    for (let i = blocks.length - 1; i >= 0; i--) {
        const oudeKleur = blocks[i].style.backgroundColor;
        blocks[i].style.backgroundColor = 'white';

        await wacht(500);

        blocks[i].style.backgroundColor = oudeKleur;
    }

    startBtn.disabled = false;
}

startBtn.addEventListener('click', function () {
    startLichtshow();
});
