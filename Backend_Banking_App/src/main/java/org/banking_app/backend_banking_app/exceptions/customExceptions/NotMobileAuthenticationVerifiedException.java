package org.banking_app.backend_banking_app.exceptions.customExceptions;

public class NotMobileAuthenticationVerifiedException extends Exception{

  public NotMobileAuthenticationVerifiedException(String deviceUUID) {
    super("The client with UUID " + deviceUUID + " is not a valid mobile authentication Device");
  }

}
