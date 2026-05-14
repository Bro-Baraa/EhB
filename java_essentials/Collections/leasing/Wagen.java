package Collections.leasing;

public class Wagen {

    // variables
    private String serienummer;
    private String brandstof;
    private int zitplaatsen;
    private boolean verhuurd;


    // Constructor
    public Wagen(String serienummer, String brandstof, int zitplaatsen, boolean verhuurd) {
        this.serienummer = serienummer;
        this.brandstof = brandstof;
        this.zitplaatsen = zitplaatsen;
        this.verhuurd = false;
    }

    // Rent car
    public void verhuur() {
        if (!verhuurd) {
            verhuurd = true;
            System.out.println("Car rented");}
        else {
            System.out.println("Car already rented");
        }



    }

    @Override
    public String toString() {
        return "Wagen: " + serienummer + " \n " + brandstof + " \n " + zitplaatsen + " \n " + verhuurd;
    }
}