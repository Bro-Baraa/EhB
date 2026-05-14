package Inheritance.Een_paar_beestjes;

public class Main {
    public static void main(String[] args) {

        // create objects
        Huisdier h1 = new Huisdier("Milo", 3, 4.5);
        Hond hond1 = new Hond("Max", 5, 10.0, "ABC123");

        // print objects (calls toString automatically)
        System.out.println(h1);
        System.out.println(hond1);
    }
}