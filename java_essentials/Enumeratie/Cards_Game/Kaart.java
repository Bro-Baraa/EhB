package Enumeratie.Cards_Game;

public class Kaart {

    private Waarde waarde;
    private Kleur kleur;

    public Kaart(Waarde waarde, Kleur kleur) {
        this.waarde = waarde;
        this.kleur = kleur;
    }

    public Waarde getWaarde() {
        return waarde;
    }

    @Override
    public String toString() {
        return waarde + " van " + kleur;
    }
}