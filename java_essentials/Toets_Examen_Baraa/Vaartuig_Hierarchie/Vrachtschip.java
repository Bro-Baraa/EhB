package Toets_Examen_Baraa.Vaartuig_Hierarchie;


public class Vrachtschip extends Vaartuig   {

    // This number helps Java check the saved object version

    private static final long serialVersionUID = 1L;


    // This is the cargo ship type
    private VrachtType type;

    private Vrachtschip(String registratiecode, int dagverbruik, VrachtType type) {

        super(registratiecode,dagverbruik)
        this.type = type;

    }

    // This getter returns the cargo ship type


    public VrachtType getType() {
            return type;
    }

    // This Setter changes that Cargo ship type
    public void setType(VrachtType type)
    {
        this.type = type;
    }
}