package Inheritance.Hierarchy;

public class Main {
    public static void main(String[] args) {

        Lokaal l1 = new Lokaal("Street 1", "A", 1, "101");
        Lokaal l2 = new Lokaal("Street 2", "B", 2, "202");

        Student s1 = new Student("Ali", "Ahmad", "S001", "TI");
        Student s2 = new Student("Sara", "Omar", "S002", "MCT");

        Docent d1 = new Docent("Jan", "Peeters", "Programming", l1);

        d1.voegStudentToe(s1);
        d1.voegStudentToe(s2);

        Bediende b1 = new Bediende("Tom", "Janssen", "Admin", l2);

        b1.wijzigLokaal(d1, l2);

        System.out.println(d1);
    }
}