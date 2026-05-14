package meer_type;

public class Main2 {
    public static void main(String[] args) {

        String my_str1 = "the quick brown fox";
        String my_str2 = "Jumps over the lazy dog";

        String my_str3 = my_str1 + " " + my_str2;
        System.out.println("Combined:  " + my_str3);

        String my_str4 = my_str3.replace("fox", "cat");
        System.out.println("After Replace: " + my_str4);

    }
}
