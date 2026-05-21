const container = document.getElementById('gebruikers-container');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Fout bij ophalen');
        }
        return response.json();
    })
    .then(function (gebruikers) {
        container.innerHTML = '';

        for (let i = 0; i < gebruikers.length; i++) {
            const gebruiker = gebruikers[i];

            const kaart = document.createElement('div');
            kaart.className = 'gebruiker-kaart';

            kaart.innerHTML =
                '<div class="gebruiker-naam">' + gebruiker.name + '</div>' +
                '<div class="gebruiker-email">' + gebruiker.email + '</div>' +
                '<div>Telefoon: ' + gebruiker.phone + '</div>';

            container.appendChild(kaart);
        }
    })
    .catch(function () {
        container.innerHTML = '<div class="error-melding">De gebruikers konden niet geladen worden.</div>';
    });
