package Input_Output.CSV.Artikel;

import java.io.*;
import java.time.LocalDate;


public class Main {
    public static void main(String[] args) {

        Artikel a1 = new Artikel(
                LocalDate.now(),
                "Java Basics",
                "Ali",
                "Learning stream is important"

        );

        // ===== WRITE (save object) =====
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("artikel.data"))) {

            // save object to file
            out.writeObject(a1);

        } catch (IOException e) {
            System.out.println("Error writing file");
        }

        // ===== READ (load object) =====
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("artikel.data"))) {

            // read object from file
            Artikel gelezen = (Artikel) in.readObject();

            // print object
            System.out.println(gelezen);

        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error reading file");
        }


    }
}
