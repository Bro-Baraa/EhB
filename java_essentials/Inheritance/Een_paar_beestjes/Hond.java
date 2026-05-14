package Inheritance.Een_paar_beestjes;

public class Hond extends Huisdier {

    // extra variable only for Hond
    private String stamboeknummer;

    // constructor
    public Hond(String naam, int leeftijd, double gewicht, String stamboeknummer) {

        // call constructor of parent (Huisdier)
        super(naam, leeftijd, gewicht);

        // set extra value
        this.stamboeknummer = stamboeknummer;
    }

    // getter = get stamboeknummer
    public String getStamboeknummer() {
        return stamboeknummer;
    }

    // setter = change stamboeknummer
    public void setStamboeknummer(String stamboeknummer) {
        this.stamboeknummer = stamboeknummer;
    }

    // toString = combine parent info + extra info
    @Override
    public String toString() {

        // super.toString() = get text from Huisdier
        return super.toString() + ", stamboeknummer=" + stamboeknummer;
    }
}
