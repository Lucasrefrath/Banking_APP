package org.banking_app.backend_banking_app.exceptions.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NoSuchSignUpRequestFoundException extends Exception{

  public NoSuchSignUpRequestFoundException() {
    super("There is no such Sign Up Request.");
  }

  public NoSuchSignUpRequestFoundException(String message) {
    super(message);
  }

}
