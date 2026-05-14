package Collections.LinkedIn;



import java.util.HashSet;
import java.util.Set;

public class Werknemer {

    // variable: name of employee
    private String naam;

    // Set = no duplicates allowed
    private Set<String> skills;

    // constructor
    public Werknemer(String naam) {
        this.naam = naam;
        this.skills = new HashSet<>();
    }

    // add skill
    public boolean addSkill(String skill) {
        // returns true if added, false if already exists
        return skills.add(skill);
    }

    // remove skill
    public boolean removeSkill(String skill) {
        // returns true if removed, false if not found
        return skills.remove(skill);
    }

    // print object
    @Override
    public String toString() {
        return naam + " skills: " + skills;
    }
}
