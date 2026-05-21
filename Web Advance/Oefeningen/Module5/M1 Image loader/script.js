const gallery = document.querySelector('.gallery');
const progressBar = document.querySelector('.progress-bar');
const loadButton = document.getElementById('loadButton');

const afbeeldingen = [
    'https://picsum.photos/200?1',
    'https://picsum.photos/200?2',
    'https://picsum.photos/200?3'
];

function laadAfbeelding(url) {
    return new Promise(function (resolve, reject) {
        const img = new Image();

        img.onload = function () {
            resolve(img);
        };

        img.onerror = function () {
            reject('Afbeelding kon niet laden');
        };

        img.src = url;
    });
}

async function startLaden() {
    gallery.innerHTML = '';
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';

    for (let i = 0; i < afbeeldingen.length; i++) {
        try {
            const img = await laadAfbeelding(afbeeldingen[i]);
            gallery.appendChild(img);

            const procent = (i + 1) * 33;

            if (i === afbeeldingen.length - 1) {
                progressBar.style.width = '100%';
                progressBar.textContent = '100%';
            } else {
                progressBar.style.width = procent + '%';
                progressBar.textContent = procent + '%';
            }
        } catch (error) {
            alert(error);
        }
    }
}

loadButton.addEventListener('click', function () {
    startLaden();
});
