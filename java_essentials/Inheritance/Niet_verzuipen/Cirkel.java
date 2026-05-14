package Inheritance.Niet_verzuipen;

public class Cirkel {

    private double straal; // radius of the circle

    // constructor: create circle with radius
    public Cirkel(double straal) {
        this.straal = straal;
    }

    // getter: get radius
    public double getStraal() {
        return straal;
    }

    // setter: change radius
    public void setStraal(double straal) {
        this.straal = straal;
    }

    // calculate area of circle
    public double getArea() {
        return Math.PI * straal * straal;
    }

    // calculate perimeter of circle
    public double getPerimeter() {
        return 2 * Math.PI * straal;
    }
}