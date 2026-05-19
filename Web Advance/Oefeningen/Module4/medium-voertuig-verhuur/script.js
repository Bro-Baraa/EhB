'use strict';

class Voertuig {

    constructor(merk, model, jaar, verhuurPrijs) {
        this.merk = merk;
        this.model = model;
        this.jaar = jaar;
        this.verhuurPrijs = verhuurPrijs;
        this.beschikbaar = true;
    }

    verhuur() {
        this.beschikbaar = false;
        return `${this.merk} ${this.model} verhuurd`;
    }

    retourneer() {
        this.beschikbaar = true;
        return `${this.merk} ${this.model} teruggebracht`;
    }
}

class Auto extends Voertuig {

    constructor(merk, model, jaar, prijs, deuren, brandstof) {
        super(merk, model, jaar, prijs);

        this.aantalDeuren = deuren;
        this.brandstofType = brandstof;
    }

    verhuur() {
        this.beschikbaar = false;
        return `${this.merk} auto verhuurd`;
    }
}

class Motor extends Voertuig {

    constructor(merk, model, jaar, prijs, cilinderinhoud, type) {
        super(merk, model, jaar, prijs);

        this.cilinderinhoud = cilinderinhoud;
        this.type = type;
    }

    verhuur() {
        this.beschikbaar = false;
        return `${this.merk} motor verhuurd`;
    }
}

const voertuigen = [
    new Auto('BMW', 'X5', 2022, 120, 4, 'Diesel'),
    new Auto('Audi', 'A3', 2021, 90, 4, 'Benzine'),
    new Motor('Yamaha', 'R1', 2020, 70, 1000, 'Sport')
];

const output = document.getElementById('output');

function toonVoertuigen() {

    let tabel = `
        <table>
            <tr>
                <th>Merk</th>
                <th>Model</th>
                <th>Jaar</th>
                <th>Status</th>
                <th>Actie</th>
            </tr>
    `;

    for (let voertuig of voertuigen) {

        tabel += `
            <tr>
                <td>${voertuig.merk}</td>
                <td>${voertuig.model}</td>
                <td>${voertuig.jaar}</td>
                <td>${voertuig.beschikbaar}</td>
                <td>
                    <button onclick="toggleVoertuig('${voertuig.model}')">
                        Toggle
                    </button>
                </td>
            </tr>
        `;
    }

    tabel += '</table>';

    output.innerHTML = tabel;
}

function toggleVoertuig(model) {

    for (let voertuig of voertuigen) {

        if (voertuig.model === model) {

            if (voertuig.beschikbaar) {
                alert(voertuig.verhuur());
            } else {
                alert(voertuig.retourneer());
            }
        }
    }

    toonVoertuigen();
}

toonVoertuigen();
