package org.banking_app.backend_banking_app.controller;

import jakarta.annotation.security.PermitAll;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAndPasswordDoNotMatchException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.service.account.AccountDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api-test/v1")
public class TestController {

  @Autowired
  AccountDataService accountDataService;

  @GetMapping("/adminAccounts")
  public ResponseEntity test() {
    return ResponseEntity.ok(accountDataService.getAllActiveByUser(1L));
  }

  @GetMapping("/throw")
  public ResponseEntity throwError() throws UserAccessNotAllowedException, UsernameAndPasswordDoNotMatchException {
    throw new UserAccessNotAllowedException();
  }

}
