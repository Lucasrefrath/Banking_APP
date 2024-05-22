package org.banking_app.backend_banking_app.exceptions;

public class NumberOfAccountsLimitedException extends Exception{

  public NumberOfAccountsLimitedException() {
    super("The Limit of Accounts has been reached");
  }
}
