package Inheritance.Herhaling_Klass;

public class Adres
{
    String straat;
    String stad;


    public Adres(String straat, String stad)
    {
        this.straat = straat;
        this.stad = stad;
    }
    public String toString()
    {
        return straat + " " + stad;
    }
}



