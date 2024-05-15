package org.banking_app.backend_banking_app.controller;

import jakarta.websocket.server.PathParam;
import org.banking_app.backend_banking_app.exceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.model.responseModel.AccountResponse;
import org.banking_app.backend_banking_app.service.dataService.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/accounts")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class AccountsController {

  @Autowired
  AccountService accountService;

  @GetMapping
  public ResponseEntity<List<AccountEntity>> getUserAccounts() {
    List<AccountEntity> response = accountService.getCurrentAuthenticatedUsersAccounts();
    System.out.println(response.toString());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{accountId}")
  public ResponseEntity getOneAccount(@PathVariable Long accountId) throws IllegalIdentifierException {
    try {
      AccountResponse account = new AccountResponse();
      account.setAccountDetails((accountService.getAccountById(accountId)));
      return ResponseEntity.ok(account);
    } catch (UserAccessNotAllowedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
  }
}
