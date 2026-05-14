package Enumeratie.Cards_Game;



import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        // read input from user
        Scanner in = new Scanner(System.in);

        // create random generator
        Random rand = new Random();

        // get all card values and colors
        Waarde[] waarden = Waarde.values();
        Kleur[] kleuren = Kleur.values();

        // create first random card
        Kaart current = new Kaart(
                waarden[rand.nextInt(waarden.length)],
                kleuren[rand.nextInt(kleuren.length)]
        );

        System.out.println("Start card: " + current);

        // game runs while true
        boolean playing = true;

        while (playing) {

            // ask user guess
            System.out.print("Higher (h) or lower (l): ");
            String input = in.nextLine();

            // create next random card
            Kaart next = new Kaart(
                    waarden[rand.nextInt(waarden.length)],
                    kleuren[rand.nextInt(kleuren.length)]
            );

            System.out.println("Next card: " + next);

            // get numbers to compare
            int currentValue = current.getWaarde().getWaarde();
            int nextValue = next.getWaarde().getWaarde();

            boolean correct = false;

            // check if guess is right
            if (input.equalsIgnoreCase("h") && nextValue > currentValue) {
                correct = true;
            } else if (input.equalsIgnoreCase("l") && nextValue < currentValue) {
                correct = true;
            }

            if (correct) {
                System.out.println("Correct!");

                // update current card
                current = next;

                // ask to continue
                System.out.print("Continue? (y/n): ");
                String again = in.nextLine();

                if (!again.equalsIgnoreCase("y")) {
                    playing = false;
                }

            } else {
                // wrong answer → stop game
                System.out.println("Wrong! Game over.");
                playing = false;
            }
        }

        in.close();
    }
}
