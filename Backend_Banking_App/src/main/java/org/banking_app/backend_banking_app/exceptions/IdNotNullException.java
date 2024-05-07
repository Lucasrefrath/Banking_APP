package org.banking_app.backend_banking_app.exceptions;

public class IdNotNullException extends Exception{

  public IdNotNullException(Long id) {
    super("ID is not Null (" + id + ")!");
  }
}
