package Objecten;

public class Adres {

    private String straatnaam;   // street name
    private int huisnummer;      // house number
    private String bus;          // bus (optional)
    private int postcode;        // postal code
    private String woonplaats;   // city

    // Constructor: create object with all data
    public Adres(String straatnaam, int huisnummer, String bus, int postcode, String woonplaats) {
        this.straatnaam = straatnaam;
        this.huisnummer = huisnummer;
        this.bus = bus;

        // check if postcode has 4 digits
        if (postcode >= 1000 && postcode <= 9999) {
            this.postcode = postcode;
        } else {
            this.postcode = 9999; // default value if wrong
        }

        this.woonplaats = woonplaats;
    }

    // Getter: get street name
    public String getStraatnaam() {
        return straatnaam;
    }

    // Setter: change street name
    public void setStraatnaam(String straatnaam) {
        this.straatnaam = straatnaam;
    }

    // Getter: get house number
    public int getHuisnummer() {
        return huisnummer;
    }

    // Setter: change house number
    public void setHuisnummer(int huisnummer) {
        this.huisnummer = huisnummer;
    }

    // Getter: get bus
    public String getBus() {
        return bus;
    }

    // Setter: change bus
    public void setBus(String bus) {
        this.bus = bus;
    }

    // Getter: get postcode
    public int getPostcode() {
        return postcode;
    }

    // Setter: set postcode with check
    public void setPostcode(int postcode) {
        if (postcode >= 1000 && postcode <= 9999) {
            this.postcode = postcode;
        } else {
            this.postcode = 9999;
        }
    }

    // Getter: get city
    public String getWoonplaats() {
        return woonplaats;
    }

    // Setter: change city
    public void setWoonplaats(String woonplaats) {
        this.woonplaats = woonplaats;
    }

    // Print: show all data on screen
    public void print() {
        System.out.println("straatnaam: " + straatnaam);
        System.out.println("huisnummer: " + huisnummer);
        System.out.println("bus: " + bus);
        System.out.println("postcode: " + postcode);
        System.out.println("woonplaats: " + woonplaats);
    }
}