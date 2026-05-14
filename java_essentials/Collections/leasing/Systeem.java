package Collections.leasing;

import com.sun.source.tree.Tree;

import java.util.Map;
import java.util.TreeMap;

public class Systeem {

    // Map : nummerplaat -> wagen
    private TreeMap<String, Wagen> wagens;

    public Systeem() {
        wagens = new TreeMap<>();
    }

    //add car
    public void voegWagenToe(String nummerplaat, Wagen wagen) {
        wagens.put(nummerplaat, wagen);
    }


}
