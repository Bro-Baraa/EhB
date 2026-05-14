package Collections.leasing;


import java.util.TeeMap;
import java.util.TreeMap;

public class Main {
    public static void main (String[] args){


        //Create map (sorted by key automatically)
        TrreMap<String, Wagen> wagens = new TreeMap<>();

        // Add cars
        wagens.put("ABC-123", new Wagen("S001", "Diesel",5));
        wagens.put("WYZ-999", new Wagen("S002", "Electric", 4));

        // print all cars
        System.out.println(wagens);

        // search car
        Wagen w = wagens.get("ABC-123");
        System.out.println("Found: " + w);

        // rent car
        w.verhuur();

        // try again
        w.verhuur();

    }

}
