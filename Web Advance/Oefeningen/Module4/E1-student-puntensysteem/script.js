'use strict';

class Student {

    constructor(naam, vakken) {
        this.naam = naam;
        this.vakken = vakken;
        this.punten = {};
    }

    voegPuntToe(vak, punt) {
        this.punten[vak] = punt;
    }

    gemiddelde() {

        let totaal = 0;
        let aantal = 0;

        for (let vak in this.punten) {
            totaal += this.punten[vak];
            aantal++;
        }

        return totaal / aantal;
    }

    toonRapport() {

        let resultaat = '';

        for (let vak in this.punten) {
            resultaat += `<p>${vak}: ${this.punten[vak]}</p>`;
        }

        return `
            <div class="card">
                <h2>${this.naam}</h2>
                ${resultaat}
                <p>Gemiddelde: ${this.gemiddelde().toFixed(1)}</p>
            </div>
        `;
    }
}

const student1 = new Student('Baraa', ['Web', 'JavaScript']);
const student2 = new Student('Alex', ['PHP', 'Database']);

student1.voegPuntToe('Web', 16);
student1.voegPuntToe('JavaScript', 18);

student2.voegPuntToe('PHP', 14);
student2.voegPuntToe('Database', 15);

const output = document.getElementById('output');

output.innerHTML += student1.toonRapport();
output.innerHTML += student2.toonRapport();
