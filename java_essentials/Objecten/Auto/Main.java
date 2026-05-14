package Objecten.Auto;

public class Main {
    public static void main(String[] args) {

        Auto auto = new Auto(); // default car

        auto.vulTank(); // fill tank

        double gereden = auto.rij(200); // drive 200 km

        System.out.println("gereden km: " + gereden);

        auto.print(); // show info
    }
}