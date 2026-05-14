package Basic_java;

import java.util.Scanner;

public class H1
{
    public static int gcd(int a,int b)
    {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter First Number: ");
        int a = scanner.nextInt();

        System.out.println("Enter Second Number: ");
        int b = scanner.nextInt();

        System.out.println("Greatest Common Divisor: " + gcd(a,b) );
        scanner.close();
    }
}
