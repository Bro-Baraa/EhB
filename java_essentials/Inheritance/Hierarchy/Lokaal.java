package Inheritance.Hierarchy;

public class Lokaal {

    // basic variables
    private String adres;
    private String gebouw;
    private int verdieping;
    private String lokaalnummer;


    // Constructor:

    public Lokaal(String adres,  String gebouw, int verdieping, String lokaalnummer) {
        this.adres = adres;
        this.gebouw = gebouw;
        this.verdieping = verdieping;
        this.lokaalnummer = lokaalnummer;

    }

    // to String return text

    @Override
    public String toString() {

        return gebouw + " - " + lokaalnummer +
                " (verdieping " + verdieping + ", " + adres + ")";


    }

}
