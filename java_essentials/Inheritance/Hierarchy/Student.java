package Inheritance.Hierarchy;

public class Student extends Persoon {


    // basic data
    private String studentnummer;
    private String specialisatie;


    // Constructor
    public Student(String naam, String achternaam, String studentnummer, String specialisatie) {
        super(naam, achternaam);
        this.studentnummer = studentnummer;
        this.specialisatie = specialisatie;

    }


    // toString functie return text that describes that object
    @Override
    public String toString() {
        return super.toString()+
                ",Studentnummer: " + studentnummer +
                "Specialisatie: " + specialisatie;

    }

}
