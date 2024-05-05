package org.banking_app.backend_banking_app.exceptions;

public class NoSuchUserFoundException extends Exception{

  public NoSuchUserFoundException(String username) {
    super("No User '" + username + "' found.");
  }
}
