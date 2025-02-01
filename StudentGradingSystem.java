import java.util.Scanner;

public class StudentGradingSystem {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int numStudents = 0;

        // Input validation for number of students
        while (true) {
            System.out.print("Enter number of students: ");
            if (scanner.hasNextInt()) {
                numStudents = scanner.nextInt();
                scanner.nextLine(); // Consume newline character
                if (numStudents > 0) {
                    break;
                } else {
                    System.out.println("Please enter a positive integer.");
                }
            } else {
                System.out.println("Invalid input! Please enter a valid number.");
                scanner.next(); // Consume invalid input
            }
        }

        String[] names = new String[numStudents];
        int[] scores = new int[numStudents];
        char[] grades = new char[numStudents];

        for (int i = 0; i < numStudents; i++) {
            System.out.print("Enter name of student " + (i + 1) + ": ");
            names[i] = scanner.nextLine();

            while (true) {
                System.out.print("Enter score for " + names[i] + ": ");
                if (scanner.hasNextInt()) {
                    scores[i] = scanner.nextInt();
                    scanner.nextLine(); // Consume newline character
                    if (scores[i] >= 0 && scores[i] <= 100) {
                        break;
                    } else {
                        System.out.println("Please enter a score between 0 and 100.");
                    }
                } else {
                    System.out.println("Invalid input! Please enter a valid score.");
                    scanner.next(); // Consume invalid input
                }
            }

            grades[i] = calculateGrade(scores[i]);
        }

        System.out.println("\nStudent Grades:");
        for (int i = 0; i < numStudents; i++) {
            System.out.println(names[i] + " - Score: " + scores[i] + " - Grade: " + grades[i]);
        }

        scanner.close();
    }

    public static char calculateGrade(int score) {
        if (score >= 90) return 'A';
        else if (score >= 80) return 'B';
        else if (score >= 70) return 'C';
        else if (score >= 60) return 'D';
        else return 'F';
    }
}