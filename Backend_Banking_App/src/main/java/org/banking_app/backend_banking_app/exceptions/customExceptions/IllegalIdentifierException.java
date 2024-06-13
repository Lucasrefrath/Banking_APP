package org.banking_app.backend_banking_app.exceptions.customExceptions;

public class IllegalIdentifierException extends Exception{

  public IllegalIdentifierException(Long id) {
    super("Could not found id " + id);
  }
}
