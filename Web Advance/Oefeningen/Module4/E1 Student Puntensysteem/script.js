'use strict';

class Student {
  constructor(naam) {
    this.naam = naam;
    this.punten = [];
  }

  voegPuntToe(vak, punt) {
    this.punten.push({
      vak: vak,
      punt: punt
    });
  }

  berekenGemiddelde() {
    let totaal = 0;

    for (let i = 0; i < this.punten.length; i++) {
      totaal += this.punten[i].punt;
    }

    return totaal / this.punten.length;
  }

  toonRapport() {
    let tekst = "<h2>" + this.naam + "</h2>";

    for (let i = 0; i < this.punten.length; i++) {
      tekst += "<p>" + this.punten[i].vak + ": " + this.punten[i].punt + "</p>";
    }

    tekst += "<p>Gemiddelde: " + this.berekenGemiddelde() + "</p>";

    return tekst;
  }
}

const student1 = new Student("Baraa");
student1.voegPuntToe("Web", 16);
student1.voegPuntToe("JavaScript", 18);

const student2 = new Student("Alex");
student2.voegPuntToe("PHP", 14);
student2.voegPuntToe("Database", 15);

const output = document.getElementById("output");
output.innerHTML += student1.toonRapport();
output.innerHTML += student2.toonRapport();