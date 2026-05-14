package Inheritance.Hierarchy;

public class Bediende extends Personeelslid {

    public Bediende(String voornaam, String achternaam, String specialisatie, Lokaal lokaal) {
        super(voornaam, achternaam, specialisatie, lokaal);
    }

    void wijzigLokaal(Personeelslid p, Lokaal nieuwLokaal) {
        p.setLokaal(nieuwLokaal);
    }
}