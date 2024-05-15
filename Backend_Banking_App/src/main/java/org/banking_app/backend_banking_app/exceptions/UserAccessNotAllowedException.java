package org.banking_app.backend_banking_app.exceptions;

public class UserAccessNotAllowedException extends Exception{
  public UserAccessNotAllowedException() {
    super("User has not Access to this resource");
  }
}
