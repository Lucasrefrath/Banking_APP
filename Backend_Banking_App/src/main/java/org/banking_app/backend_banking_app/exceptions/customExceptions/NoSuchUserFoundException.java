package org.banking_app.backend_banking_app.exceptions.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "wrong username or password")
public class NoSuchUserFoundException extends Exception {

  public NoSuchUserFoundException(String username) {
    super("The user '" + username + "' does not exist.");
  }

  public NoSuchUserFoundException() {
    super("There is no such user.");
  }

}
