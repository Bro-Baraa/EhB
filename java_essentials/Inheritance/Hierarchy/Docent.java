package Inheritance.Hierarchy;

public class Docent extends Personeelslid {

    // array of students
    private Student[] studenten;
    private int count = 0;

    public Docent(String voornaam, String achternaam, String specialisatie, Lokaal lokaal) {
        super(voornaam, achternaam, specialisatie, lokaal);
        studenten = new Student[10]; // max 10 students
    }

    // add student to docent
    public void voegStudentToe(Student s) {
        if (count < studenten.length) {
            studenten[count] = s;
            count++;
        }
    }

    @Override
    public String toString() {
        String result = super.toString() + "\nStudents:\n";

        for (int i = 0; i < count; i++) {
            result += studenten[i] + "\n";
        }

        return result;
    }
}

