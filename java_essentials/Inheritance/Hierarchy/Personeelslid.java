package Inheritance.Hierarchy;

public class Personeelslid extends Persoon {

    protected String specialisatie;
    protected Lokaal lokaal;

    public Personeelslid(String voornaam, String achternaam, String specialisatie, Lokaal lokaal) {
        super(voornaam, achternaam);
        this.specialisatie = specialisatie;
        this.lokaal = lokaal;
    }

    public Lokaal getLokaal() {
        return lokaal;
    }

    void setLokaal(Lokaal lokaal) {
        this.lokaal = lokaal;
    }

    @Override
    public String toString() {
        return super.toString() +
                ", specialisatie=" + specialisatie +
                ", lokaal=" + lokaal;
    }
}