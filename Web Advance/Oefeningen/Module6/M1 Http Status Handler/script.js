const knoppen = document.querySelectorAll('.endpoint-knop');
const statusInfo = document.getElementById('status-info');
const responseDetails = document.getElementById('response-details');

for (let i = 0; i < knoppen.length; i++) {
    knoppen[i].addEventListener('click', function () {
        const code = this.dataset.code;
        testStatus(code);
    });
}

function testStatus(code) {
    statusInfo.className = '';
    statusInfo.textContent = 'Status wordt getest...';
    responseDetails.textContent = '';

    fetch('https://httpstat.us/' + code)
        .then(function (response) {
            const groep = Math.floor(response.status / 100) * 100;
            let klasse = '';

            if (groep === 200) klasse = 'status-success';
            if (groep === 300) klasse = 'status-redirect';
            if (groep === 400) klasse = 'status-client-error';
            if (groep === 500) klasse = 'status-server-error';

            statusInfo.className = klasse;
            statusInfo.innerHTML =
                'Status: ' + response.status + ' ' + response.statusText + '<br>' +
                'Succesvol: ' + response.ok + '<br>' +
                'Groep: ' + groep + 's';

            let tekst = 'Response type: ' + response.type + '

Headers:
';

            response.headers.forEach(function (waarde, naam) {
                tekst += naam + ': ' + waarde + '
';
            });

            responseDetails.textContent = tekst;
        })
        .catch(function () {
            statusInfo.className = 'status-client-error';
            statusInfo.textContent = 'Netwerkfout. De request is niet gelukt.';
        });
}
