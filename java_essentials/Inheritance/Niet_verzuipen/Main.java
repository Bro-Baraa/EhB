package Inheritance.Niet_verzuipen;

public class Main {
    public static void main(String[] args) {

        Zwembad zwembad = new Zwembad(5.0, 2.0, 45.0, 80.75);

        System.out.println("Pad prijs: " + zwembad.berekenPadPrijs());
        System.out.println("Omheining prijs: " + zwembad.berekenOmheiningPrijs());
        System.out.println("Totale prijs: " + zwembad.berekenTotalePrijs());
    }
}
