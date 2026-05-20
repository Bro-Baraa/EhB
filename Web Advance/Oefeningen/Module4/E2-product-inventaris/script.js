'use strict';

class Product {
  constructor(naam, prijs, voorraad) {
    this.naam = naam;
    this.prijs = prijs;
    this.voorraad = voorraad;
  }

  berekenVerkoopprijs() {
    return this.prijs * 1.21;
  }

  isBeschikbaar() {
    if (this.voorraad > 0) {
      return "Ja";
    } else {
      return "Nee";
    }
  }

  toonProduct() {
    let tekst = "<h2>" + this.naam + "</h2>";
    tekst += "<p>Prijs: €" + this.prijs + "</p>";
    tekst += "<p>Verkoopprijs: €" + this.berekenVerkoopprijs() + "</p>";
    tekst += "<p>Beschikbaar: " + this.isBeschikbaar() + "</p>";

    return tekst;
  }
}

const product1 = new Product("Laptop", 900, 5);
const product2 = new Product("Mouse", 25, 0);
const product3 = new Product("Keyboard", 60, 8);

const output = document.getElementById("output");

output.innerHTML += product1.toonProduct();
output.innerHTML += product2.toonProduct();
output.innerHTML += product3.toonProduct();