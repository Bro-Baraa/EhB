package Inheritance.Een_paar_beestjes;

public class Huisdier {

    // variables (fields) = data of the object
    private String naam;
    private int leeftijd;
    private double gewicht;

    // constructor = used to create a new object and give values
    public Huisdier(String naam, int leeftijd, double gewicht) {
        this.naam = naam;
        this.leeftijd = leeftijd;
        this.gewicht = gewicht;
    }

    // getter = get (read) the value of naam
    public String getNaam() {
        return naam;
    }

    // setter = change (update) the value of naam
    public void setNaam(String naam) {
        this.naam = naam;
    }

    // getter = get leeftijd
    public int getLeeftijd() {
        return leeftijd;
    }

    // setter = change leeftijd
    public void setLeeftijd(int leeftijd) {
        this.leeftijd = leeftijd;
    }

    // getter = get gewicht
    public double getGewicht() {
        return gewicht;
    }

    // setter = change gewicht
    public void setGewicht(double gewicht) {
        this.gewicht = gewicht;
    }

    // toString = returns text that describes the object
    // used when we print the object
    @Override
    public String toString() {
        return "Huisdier: naam=" + naam +
                ", leeftijd=" + leeftijd +
                ", gewicht=" + gewicht;
    }
}