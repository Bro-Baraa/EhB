package Inheritance.Herhaling_Klass;

public class Main {

    public static void main(String[] args) {

        // Create first persoon
        Persoon p1 = new Persoon ("Ali", "Hassan");
        p1.email = "Ali@gmail.com";
        p1.adres =  new Adres("Street 1", "Brussels");

        // create Second persoon
        Persoon p2 = new Persoon ("Sara", "Hassan");
        p2.email = "sara@gmail.com";
        p2.adres =  new Adres("Street 2", "Brussels");


        // print persoon=
        System.out.println(p1);
        System.out.println("\n");
        System.out.println(p2);

        // Print total number of persons
        System.out.println("Total persons: " + Persoon.aantal);

    }
    


}
