package meer_type;

public class Main1 {
    public static void main(String[] args) {

        int[] myarray = new int[10];

        // 10 elementen met waarde 5

        for (int i =0; i < myarray.length; i++)
        {
            myarray[i]=5;
        }

        // Tweede waarde met 23
        myarray[1]= 23;

        //probeeren met waarde 1.5
        //myarray[2]= 1.5;

        // Trying with double variable
        //double[] myarray = new double[10];
        for (int i =0; i < myarray.length; i++)
            {

                System.out.println("Element " + i + " = " + myarray[i]);
            }

    }


}

