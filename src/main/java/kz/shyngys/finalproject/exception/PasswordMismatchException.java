package kz.shyngys.finalproject.exception;

public class PasswordMismatchException extends RuntimeException {

    public PasswordMismatchException() {
        super("Passwords do not match");
    }
}
