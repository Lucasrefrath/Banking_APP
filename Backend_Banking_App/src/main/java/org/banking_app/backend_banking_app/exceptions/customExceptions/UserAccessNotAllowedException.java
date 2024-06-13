package org.banking_app.backend_banking_app.exceptions.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class UserAccessNotAllowedException extends Exception {
  public UserAccessNotAllowedException() {
    super("User has not Access to this resource");
  }
}
