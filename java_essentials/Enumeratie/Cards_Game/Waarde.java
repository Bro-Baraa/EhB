package Enumeratie.Cards_Game;

public enum Waarde {


    AAS(1), TWEE(2), DRIE(3), VIER(4), VIJF(5),
    ZES(6), ZEVEN(7), ACHT(8), NEGEN(9), TIEN(10),
    BOER(11), DAME(12), HEER(13);

    private int waarde;

    // Constructor
    private Waarde(int waarde) {
        this.waarde = waarde;
    }

    // Getter
    public  int getWaarde() {
        return waarde;
    }
}
