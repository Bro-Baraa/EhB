package Toets_Examen_Baraa.Vaartuig_Hierarchie;


public class Passagiersschip extends Vaartuig implements Comparable<Passagiersschip> {

    // This number helps Java check the saved object version
    private static final long serialVersionUID = 1L;

    // This is the number of decks
    private int aantalDekken;

    // This constructor makes a passenger ship
    public Passagiersschip(String registratiecode, int dagverbruik, int aantalDekken) {
        super(registratiecode, dagverbruik);
        this.aantalDekken = aantalDekken;
    }

    // This getter returns the number of decks
    public int getAantalDekken() {
        return aantalDekken;
    }

    // This setter changes the number of decks
    public void setAantalDekken(int aantalDekken) {
        this.aantalDekken = aantalDekken;
    }

    @Override
    public int compareTo(Passagiersschip other) {
        // This sorts ships by number of decks
        int result = Integer.compare(this.aantalDekken, other.aantalDekken);

        // This sorts by code if the deck number is the same
        if (result == 0) {
            result = this.getRegistratiecode().compareTo(other.getRegistratiecode());
        }

        // This returns the final sort result
        return result;
    }
}