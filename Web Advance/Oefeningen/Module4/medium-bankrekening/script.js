'use strict';

class Bankrekening {

    static teller = 1;

    constructor(eigenaar, saldo) {

        this.rekeningnummer =
            Bankrekening.rekeningNrGenerator();

        this.eigenaar = eigenaar;
        this.saldo = saldo;
    }

    static rekeningNrGenerator() {
        return 'ACC' + this.teller++;
    }

    static validerenTransactie(from, to, bedrag) {
        return from.saldo >= bedrag;
    }

    set saldo(value) {

        if (value < 0) {
            this._saldo = 0;
        } else {
            this._saldo = value;
        }
    }

    get saldo() {
        return this._saldo;
    }

    get overzicht() {
        return `${this.eigenaar} - €${this.saldo}`;
    }

    storten(bedrag) {
        this.saldo += bedrag;
        return `€${bedrag} gestort`;
    }

    opnemen(bedrag) {

        if (Bankrekening.validerenTransactie(this, null, bedrag)) {

            this.saldo -= bedrag;
            return `€${bedrag} opgenomen`;
        }

        return 'Onvoldoende saldo';
    }
}

class Spaarrekening extends Bankrekening {

    constructor(eigenaar, saldo, rente) {
        super(eigenaar, saldo);
        this.rentepercentage = rente;
    }

    renteToevoegen() {
        this.saldo += this.saldo * this.rentepercentage;
    }
}

const rekening1 = new Bankrekening('Baraa', 500);
const rekening2 = new Spaarrekening('Alex', 1000, 0.05);

const transacties = [];

transacties.push(rekening1.storten(200));
transacties.push(rekening1.opnemen(100));

rekening2.renteToevoegen();

const accounts = document.getElementById('accounts');
const transactions = document.getElementById('transactions');

accounts.innerHTML += `
    <div class="card">
        <p>${rekening1.overzicht}</p>
    </div>
`;

accounts.innerHTML += `
    <div class="card">
        <p>${rekening2.overzicht}</p>
    </div>
`;

for (let transactie of transacties) {

    transactions.innerHTML += `
        <div class="card">
            <p>${transactie}</p>
        </div>
    `;
}
