'use strict';
class Bankrekening {
  constructor(eigenaar, saldo) {
    this.eigenaar = eigenaar;
    this.saldo = saldo;
  }

  storten(bedrag) {
    this.saldo += bedrag;
    return "€" + bedrag + " gestort";
  }

  opnemen(bedrag) {
    if (bedrag <= this.saldo) {
      this.saldo -= bedrag;
      return "€" + bedrag + " opgenomen";
    } else {
      return "Onvoldoende saldo";
    }
  }

  toonInfo() {
    return this.eigenaar + " - €" + this.saldo;
  }
}

class Spaarrekening extends Bankrekening {
  constructor(eigenaar, saldo, rente) {
    super(eigenaar, saldo);
    this.rente = rente;
  }

  voegRenteToe() {
    this.saldo = this.saldo + this.saldo * this.rente;
  }
}

const rekening1 = new Bankrekening("Baraa", 500);
const rekening2 = new Spaarrekening("Alex", 1000, 0.05);

const transacties = [];

transacties.push(rekening1.storten(200));
transacties.push(rekening1.opnemen(100));

rekening2.voegRenteToe();

const accounts = document.getElementById("accounts");
const transactions = document.getElementById("transactions");

accounts.innerHTML += "<p>" + rekening1.toonInfo() + "</p>";
accounts.innerHTML += "<p>" + rekening2.toonInfo() + "</p>";

for (let i = 0; i < transacties.length; i++) {
  transactions.innerHTML += "<p>" + transacties[i] + "</p>";
}