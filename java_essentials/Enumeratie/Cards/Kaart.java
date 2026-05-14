package Enumeratie.Cards;

public class Kaart {

    // variables = data of the card
    private Waarde waarde;
    private Kleur kleur;


    // Constructor
    public Kaart(Waarde waarde, Kleur kleur) {
        this.waarde = waarde;
        this.kleur = kleur;
    }

    //toString
    @Override
    public String toString() {
        return waarde + " Van " + kleur;
    }



}
