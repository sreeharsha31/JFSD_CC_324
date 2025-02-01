
import java.util.Scanner;

public class StudentGradingSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name;
        int age;
        float cgpa;
        char grade;

        System.out.println("Enter Your Name: ");
        name = sc.nextLine();
        System.out.println("Enter Your Age: ");
        age = sc.nextInt();
        System.out.println("Enter Your CGPA: ");
        cgpa = sc.nextFloat();
        System.out.println("Enter Your Grade: ");
        grade = sc.next().charAt(0);

        System.out.println("Name: "+name);
        System.out.println("AGE: "+age);
        System.out.println("CGPA: "+cgpa);
        System.out.println("Grade: "+grade);
    }
}