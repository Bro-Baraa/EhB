package Enumeratie.Cards;

public class Main {

    public static void main(String[] args) {
        // 2D array: 4 rows (colors), 13 columns (values)
        Kaart[][] kaarten = new Kaart[4][13];

        // get all enum values
        Kleur[] kleuren = Kleur.values();
        Waarde[] waarden = Waarde.values();


        // fill the array
        for (int i = 0; i < kleuren.length; i++) {
            for (int j = 0; j < waarden.length; j++) {

                // create new card with color + value
                kaarten[i][j] = new Kaart(waarden[j], kleuren[i]);
            }
        }


        // print all cards
        for (int i = 0; i < kaarten.length; i++) {
            for (int j = 0; j < kaarten[i].length; j++) {

                System.out.println(kaarten[i][j]);
            }
        }

    }

}
