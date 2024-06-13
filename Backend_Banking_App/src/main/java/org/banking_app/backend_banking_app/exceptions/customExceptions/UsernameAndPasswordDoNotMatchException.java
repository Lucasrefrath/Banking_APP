package org.banking_app.backend_banking_app.exceptions.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UsernameAndPasswordDoNotMatchException extends Exception{

  public UsernameAndPasswordDoNotMatchException() {
    super("Username and Password do not match. Try again");
  }
}
