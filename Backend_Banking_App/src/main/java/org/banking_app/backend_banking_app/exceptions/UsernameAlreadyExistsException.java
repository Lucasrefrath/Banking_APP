package org.banking_app.backend_banking_app.exceptions;

public class UsernameAlreadyExistsException extends Exception{

  public UsernameAlreadyExistsException(String username) {
    super("Username '" + username + "' already exists.");
  }
}
