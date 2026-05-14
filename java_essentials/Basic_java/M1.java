package Basic_java;

public class M1
{
    public static void main(String[] args)
    {
        int hoogte = 4;
        for (int i = 1; i <= hoogte; i++){
            for (int j = 1; j <= i; j++){
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
