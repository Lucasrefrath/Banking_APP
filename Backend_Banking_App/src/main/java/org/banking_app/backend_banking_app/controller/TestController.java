package org.banking_app.backend_banking_app.controller;

import jakarta.annotation.security.PermitAll;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAndPasswordDoNotMatchException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api-test/v1")
public class TestController {

  @GetMapping("/test")
  @PermitAll
  public ResponseEntity test() {
    return ResponseEntity.ok().build();
  }

  @GetMapping("/throw")
  public ResponseEntity throwError() throws UserAccessNotAllowedException, UsernameAndPasswordDoNotMatchException {
    throw new UserAccessNotAllowedException();
  }

}
