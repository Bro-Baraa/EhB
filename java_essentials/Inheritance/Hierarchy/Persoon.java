package Inheritance.Hierarchy;

public class Persoon {

    // basic data
    protected String  naam;
    protected String achternaam;


    // constructor
    public Persoon(String naam, String achternaam) {
        this.naam = naam;
        this.achternaam = achternaam;
    }

    // to String = print basic info
    @Override
    public String toString() {
        return naam + "  " + achternaam;
    }

}
