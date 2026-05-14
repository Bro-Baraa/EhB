package Inheritance.Herhaling_Klass;

public class Persoon  {


    String voornaam;
    String achternaam;
    String email;
    Adres adres;

    // static variable to count persons
    static int aantal = 0;


    // constructor
    public Persoon (String voornaam, String achternaam)
    {
        this.voornaam = voornaam;
        this.achternaam = achternaam;
        aantal++;

    }

    public String toString()
    {
        return "Name" + voornaam + " " + achternaam +
                "\nAdres: " + adres +
                "\nEmail: " + email;
    }
}
