public class Main {

    static class Cirkel {

        private double straal;
        private String kleur;

        public Cirkel() {
            this.straal = 0;
            this.kleur = "wit";
        }

        public Cirkel(double straal) {
            this.straal = straal;
            this.kleur = "wit";
        }

        public Cirkel(double straal, String kleur) {
            this.straal = straal;
            this.kleur = kleur;
        }

        public double getStraal() {
            return straal;
        }

        public void setStraal(double straal) {
            this.straal = straal;
        }

        public String getKleur() {
            return kleur;
        }

        public void setKleur(String kleur) {
            this.kleur = kleur;
        }

        public void print() {
            System.out.println("Cirkel - straal: " + straal + ", kleur: " + kleur);
        }

        public double geefOmtrek() {
            return 2 * Math.PI * straal;
        }

        public double geefOppervlakte() {
            return Math.PI * straal * straal;
        }
    }

    public static void main(String[] args) {
        Cirkel c = new Cirkel(5, "blauw");
        c.print();
        System.out.println("Omtrek: " + c.geefOmtrek());
        System.out.println("Oppervlakte: " + c.geefOppervlakte());
    }
}