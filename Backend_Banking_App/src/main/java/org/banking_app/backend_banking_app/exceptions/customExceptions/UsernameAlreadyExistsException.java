package org.banking_app.backend_banking_app.exceptions.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "username already exists")
public class UsernameAlreadyExistsException extends Exception{

  public UsernameAlreadyExistsException(String username) {
    super("Username '" + username + "' already exists.");
  }
}
