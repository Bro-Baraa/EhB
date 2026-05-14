package Input_Output.CSV;

import java.io.FileReader;
import java.io.IOException;
import java.io.BufferedReader;







public class Main {
    public static void main(String[] args) {

        // path to CSV file (put file in project folder)
        String path = "C:\\Users\\baraa\\OneDrive\\Desktop\\punten.csv";

        try {
            // FileReader = open file
            FileReader fr = new FileReader(path);

            // BufferedReader = read text line by line
            BufferedReader br = new BufferedReader(fr);

            String line;

            // read file line by line
            while ((line = br.readLine()) != null) {

                // print the line
                System.out.println(line);
            }

            // close reader
            br.close();

        } catch (IOException e) {
            System.out.println("Error reading file");
        }
    }
}