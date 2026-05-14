package Objecten.Auto;

public class Auto {

    private double kilometersstand; // total km
    private double tankInhoud;       // current fuel (liters)
    private double verbruik;         // liters per 100 km
    private double maxTank;          // max tank capacity




    // Constructor with all values
    public Auto( double kilometersstand,double tankInhoud,double verbruik,double maxTank)
    {
        this.kilometersstand = kilometersstand;
        this.tankInhoud = tankInhoud;
        this.verbruik = verbruik;
        this.maxTank = maxTank;

        }
        // Default constructor (new car, empty tank)
    public Auto() {
            this.kilometersstand = 0;
            this.tankInhoud = 0;
            this.verbruik = 5;   // example value
            this.maxTank = 50;   // example tank size
        }


    // Fill tank to full
    public void vulTank()
    {
        tankInhoud = maxTank;
    }

    // Drive method
    public double rij(double km) {

        double afstand = Math.abs(km); // always positive distance

        // fuel needed for requested distance
        double nodig = (verbruik / 100) * afstand;

        if (nodig <= tankInhoud) {
            // enough fuel
            tankInhoud -= nodig;
            kilometersstand += afstand;
            return afstand;
        } else {
            // not enough fuel → drive max possible
            double maxAfstand = (tankInhoud / verbruik) * 100;

            kilometersstand += maxAfstand;
            tankInhoud = 0;

            return maxAfstand;
        }
    }

    // Print all data
    public void print() {
        System.out.println("kilometerstand: " + kilometersstand);
        System.out.println("tank: " + tankInhoud + " liter");
        System.out.println("verbruik: " + verbruik + " L/100km");
    }















}
