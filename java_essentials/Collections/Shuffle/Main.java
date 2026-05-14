package Collections.Shuffle;


import java.util.ArrayList;
import java.util.Collections;


public class Main {

    public static void main(String[] args) {

        ArrayList<String> studenten = new ArrayList<>();

        studenten.add("Ali");
        studenten.add("Sara");
        studenten.add("Jan");
        studenten.add("Michiel");
        studenten.add("Jeroen");


        // Shuffle = random order
        Collections.shuffle(studenten);

        //print list
        System.out.println(studenten);

    }

}
