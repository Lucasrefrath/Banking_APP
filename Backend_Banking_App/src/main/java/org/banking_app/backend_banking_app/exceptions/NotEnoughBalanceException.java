package org.banking_app.backend_banking_app.exceptions;

public class NotEnoughBalanceException extends Exception{

  public NotEnoughBalanceException(Double amount, Double balance) {
    super("There is not enough money for this transaction (balance: " + balance + " | requested amount: " + amount +")");
  }
}
