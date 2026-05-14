package Objecten;
import java.lang.Math;



public class Cirkel {

    private double straal;
    private String kleur;

    // Default constructor
    public Cirkel() {
        this.straal = 0;
        this.kleur = "wit";
    }

    // Constructor met straal
    public Cirkel(double straal) {
        this.straal = straal;
        this.kleur = "wit";
    }

    // Constructor met kleur
    public Cirkel(String kleur) {
        this.straal = 0;
        this.kleur = kleur;
    }

    // Constructor met beide
    public Cirkel(double straal, String kleur) {
        this.straal = straal;
        this.kleur = kleur;
    }

    // Getters
    public double getStraal() {
        return straal;
    }

    public String getKleur() {
        return kleur;
    }

    // Setters
    public void setStraal(double straal) {
        this.straal = straal;
    }

    public void setKleur(String kleur) {
        this.kleur = kleur;
    }

    // Print
    public void print() {
        System.out.println("Cirkel - Straal: " + straal + ", Kleur: " + kleur);
    }

    // Omtrek
    public double geefOmtrek() {
        return 2 * Math.PI * straal;
    }

    // Oppervlakte
    public double geefOppervlakte() {
        return Math.PI * straal * straal;
    }
}