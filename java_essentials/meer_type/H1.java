package meer_type;

import java.time.LocalDate;


public class H1 {
    public static void main(String args[]) {
        LocalDate [] afspraken = new LocalDate[5];



        // today
        afspraken[0] = LocalDate.now();

        // Every time/attempt +15 Day
        for (int i = 1; i < afspraken.length; i++) {
            afspraken[i] = afspraken[i - 1].plusDays(15);
        }
        // Output days and date of appointment

        for (int i = 0; i < afspraken.length; i++) {
            System.out.println("Afspraak " + i + " : " + afspraken[i]);
        }
    }
}