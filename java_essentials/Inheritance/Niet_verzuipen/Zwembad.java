package Inheritance.Niet_verzuipen;

public class Zwembad {

    double zwembadStraal;
    double padBreedte;
    double padPrijsPerM2;
    double omheiningPrijsPerMeter;

    public Zwembad(double zwembadStraal, double padBreedte,
                   double padPrijsPerM2, double omheiningPrijsPerMeter) {

        this.zwembadStraal = zwembadStraal;
        this.padBreedte = padBreedte;
        this.padPrijsPerM2 = padPrijsPerM2;
        this.omheiningPrijsPerMeter = omheiningPrijsPerMeter;
    }

    // calculate path price
    public double berekenPadPrijs() {

        double buitenStraal = zwembadStraal + padBreedte;

        Cirkel binnen = new Cirkel(zwembadStraal);
        Cirkel buiten = new Cirkel(buitenStraal);

        double padOppervlakte = buiten.getArea() - binnen.getArea();

        return padOppervlakte * padPrijsPerM2;
    }

    // calculate fence price
    public double berekenOmheiningPrijs() {

        double buitenStraal = zwembadStraal + padBreedte;

        Cirkel buiten = new Cirkel(buitenStraal);

        double omtrek = buiten.getPerimeter();

        return omtrek * omheiningPrijsPerMeter;
    }

    // total price
    public double berekenTotalePrijs() {
        return berekenPadPrijs() + berekenOmheiningPrijs();
    }
}