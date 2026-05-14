package Objecten.BankRekening;

public class Main {
    public static void main(String[] args) {

        BankRekening rekening = new BankRekening(100);

        rekening.stort(50);   // deposit
        rekening.haalAf(120); // withdraw

        rekening.print();     // show balance

        rekening.haalAf(2000); // should give error
    }
}