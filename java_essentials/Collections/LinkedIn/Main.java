package Collections.LinkedIn;



public class Main {
    public static void main(String[] args) {

        Werknemer w1 = new Werknemer("Ali");

        System.out.println(w1.addSkill("Java"));        // true
        System.out.println(w1.addSkill("Java"));        // false (duplicate)

        System.out.println(w1.addSkill("Networking"));  // true

        System.out.println(w1.removeSkill("Java"));     // true
        System.out.println(w1.removeSkill("Python"));   // false

        System.out.println(w1);
    }
}