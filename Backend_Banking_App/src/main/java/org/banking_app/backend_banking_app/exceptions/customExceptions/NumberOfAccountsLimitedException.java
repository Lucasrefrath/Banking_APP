package org.banking_app.backend_banking_app.exceptions.customExceptions;

public class NumberOfAccountsLimitedException extends Exception{

  public NumberOfAccountsLimitedException() {
    super("The Limit of Accounts has been reached");
  }
}
