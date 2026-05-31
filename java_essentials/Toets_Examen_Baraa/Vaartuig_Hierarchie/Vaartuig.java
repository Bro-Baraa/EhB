package Toets_Examen_Baraa.Vaartuig_Hierarchie;


import java.io.Serializable;


public abstract class Vaartuig implements Serializable {

 // this is registratiecode and dagverbruik :
    private String registratiecode;
    private int dagverbruik;

// This is Constructor gives every ship a code and feul use

    public Vaartuig(String registratiecode, int dagverbruik) {

        this.registratiecode = registratiecode;
        this.dagverbruik = dagverbruik;
    }

    // Getter return the Regis code
    public String getRegistratiecode() {
        return registratiecode;
    }




    // This is Settter change registratiecode
    public void setRegistratiecode(String registratiecode) {
        this.registratiecode = registratiecode;
    }

    // Getter return the daily feul use


    public int getDagverbruik() {
        return dagverbruik;
    }

    // This is Setter changes the daily fuel use
    public void setDagverbruik(int dagverbruik) {
        this.dagverbruik = dagverbruik;
    }

}

















