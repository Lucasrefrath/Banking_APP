package org.banking_app.backend_banking_app.exceptions.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NoSuchAccountActionApprovalFoundException extends Exception{

  public NoSuchAccountActionApprovalFoundException() {
    super("There is no such Account Action Approval.");
  }

  public NoSuchAccountActionApprovalFoundException(String message) {
    super(message);
  }

}
