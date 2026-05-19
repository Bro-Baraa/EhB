'use strict';

class Product {

    constructor(naam, prijs, voorraad) {
        this.naam = naam;
        this.prijs = prijs;
        this.voorraad = voorraad;
    }

    set prijs(value) {

        if (value < 0) {
            this._prijs = 0;
        } else {
            this._prijs = value;
        }
    }

    get prijs() {
        return this._prijs;
    }

    set voorraad(value) {

        if (value < 0) {
            this._voorraad = 0;
        } else {
            this._voorraad = value;
        }
    }

    get voorraad() {
        return this._voorraad;
    }

    get verkoopprijs() {
        return this.prijs * 1.21;
    }

    get beschikbaar() {
        return this.voorraad > 0;
    }
}

const producten = [
    new Product('Laptop', 900, 5),
    new Product('Mouse', 25, 0),
    new Product('Keyboard', 60, 8)
];

const output = document.getElementById('output');

for (let product of producten) {

    output.innerHTML += `
        <div class="product">
            <h2>${product.naam}</h2>
            <p>Prijs: €${product.prijs}</p>
            <p>Verkoopprijs: €${product.verkoopprijs.toFixed(2)}</p>
            <p>Beschikbaar: ${product.beschikbaar}</p>
        </div>
    `;
}
