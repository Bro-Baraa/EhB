package Input_Output.CSV.Artikel;

import java.time.LocalDate;
import java.io.Serializable;

public class Artikel implements Serializable {


    // Varaiable
    private LocalDate publicatieDatum;
    private String titel;
    private String auteur;
    private String inhoud;


    // Constructor
    public Artikel(LocalDate publivatieDatum, String titel, String auteur, String inhoud) {
        this.publicatieDatum = publivatieDatum;
        this.titel = titel;
        this.auteur = auteur;
        this.inhoud = inhoud;
    }


    //getters
    public LocalDate getPublicatieDatum() {
        return publicatieDatum;
    }

    public String getTitel() {
        return titel;
    }
    public String getAuteur() {
        return auteur;
    }

    public String getInhoud() {
        return inhoud;
    }


    //Setters
    public void setPublicatieDatum(LocalDate publicatieDatum) {
        this.publicatieDatum = publicatieDatum;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public void setInhoud(String inhoud) {
        this.inhoud = inhoud;
    }



    // toString
    @Override
    public String toString() {
        return "Artikel{" + "publicatieDatum= " + publicatieDatum +
                ", titel=" + titel  +
                ", auteur=" + auteur  +
                ", inhoud=" + inhoud + '}';
    }


}
