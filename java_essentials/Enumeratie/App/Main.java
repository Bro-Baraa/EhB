package Enumeratie.App;

public class Main {

    public  static void main(String[] args) {

        // loop over all enum values
        for (Status s: Status.values())
            {
            s.run();
            }


    }


}
