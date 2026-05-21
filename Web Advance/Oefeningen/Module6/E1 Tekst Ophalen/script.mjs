const knop = document.getElementById('haalTekstOp');
const resultaat = document.getElementById('resultaat');

knop.addEventListener('click', function () {
    resultaat.className = '';
    resultaat.textContent = 'Even laden...';

    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('De post kon niet opgehaald worden.');
            }
            return response.json();
        })
        .then(function (post) {
            let tekst = 'Titel:
' + post.title + '

';
            tekst += 'Bericht:
' + post.body;
            resultaat.textContent = tekst;
        })
        .catch(function () {
            resultaat.className = 'error';
            resultaat.textContent = 'Er ging iets mis bij het ophalen van de tekst.';
        });
});
