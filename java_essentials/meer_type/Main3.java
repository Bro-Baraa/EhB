package meer_type;

public class Main3 {
    public static void main(String[] args) {

        int [] cijfers = {10, 20,30,40,99};

        int sum = 0;
        for(int i= 0 ; i< cijfers.length; i++){
            sum += cijfers[i];


        }
        double avarage = sum/cijfers.length;
        System.out.println("Average: " + avarage);


    }
}
