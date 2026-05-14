package Objecten.BankRekening;

public class BankRekening {

    private double bedrag; // account balance

    // Default constructor
    public BankRekening() {
        this.bedrag = 0.0;
    }

    // Constructor with value
    public BankRekening(double bedrag) {
        if (bedrag >= 0) {
            this.bedrag = bedrag;
        } else {
            this.bedrag = 0.0; // if negative → set to 0
        }
    }

    // Getter: get balance
    public double getBedrag() {
        return bedrag;
    }

    // Private setter: only used inside class
    private void setBedrag(double bedrag) {
        this.bedrag = bedrag;
    }

    // Deposit money
    public void stort(double amount) {
        if (amount > 0) {
            setBedrag(this.bedrag + amount);
        }
    }

    // Withdraw money
    public void haalAf(double amount) {

        double nieuwBedrag = this.bedrag - amount;

        // check limit (-1000)
        if (nieuwBedrag >= -1000) {
            setBedrag(nieuwBedrag);
        } else {
            System.out.println("Error: withdrawal not allowed (limit -1000)");
        }
    }

    // Print info
    public void print() {
        System.out.println("Balance: " + bedrag);
    }
}