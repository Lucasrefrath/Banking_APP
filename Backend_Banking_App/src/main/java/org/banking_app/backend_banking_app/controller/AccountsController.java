package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.exceptions.*;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.requestModel.CreateAccountRequest;
import org.banking_app.backend_banking_app.model.requestModel.DeactivateAccountRequest;
import org.banking_app.backend_banking_app.model.responseModel.AccountResponse;
import org.banking_app.backend_banking_app.service.account.AccountActionService;
import org.banking_app.backend_banking_app.service.account.AccountDataService;
import org.banking_app.backend_banking_app.service.accountHistory.AccountHistoryDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/accounts")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class AccountsController {

  @Autowired
  private AccountDataService accountDataService;

  @Autowired
  private AccountHistoryDataService accountHistoryDataService;

  @Autowired
  AccountActionService activateAccount;
  @Autowired
  private AccountActionService accountActionService;

  @GetMapping
  public ResponseEntity<List<AccountEntity>> getUserAccounts() {
    List<AccountEntity> response = accountDataService.getCurrentAuthenticatedUsersAccounts();
    System.out.println(response.toString());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{accountId}")
  public ResponseEntity getOneAccount(@PathVariable Long accountId) throws IllegalIdentifierException {
    try {
      AccountResponse account = new AccountResponse();
      account.setAccountDetails((accountDataService.getAccountById(accountId)));
      account.setAccountHistory(accountHistoryDataService.getHistoryForAccount(accountId));
      return ResponseEntity.ok(account);
    } catch (UserAccessNotAllowedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
  }

  @PostMapping("/create")
  public ResponseEntity<AccountEntity> createNewAccount(@RequestBody CreateAccountRequest request) throws NoSuchUserFoundException, IdNotNullException, NumberOfAccountsLimitedException {
    AccountEntity account = accountActionService.createAccount(request.getName());
    return ResponseEntity.ok(account);
  }

  @DeleteMapping("/deactivate")
  public ResponseEntity<String> deactivateAccount(@RequestBody DeactivateAccountRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException {
    accountActionService.deactivateAccount(request.getId());
    return ResponseEntity.ok("Account " + request.getId() + " deactivated successful");
  }

  @PostMapping("/activate")
  public ResponseEntity<String> activateAccount(@RequestBody DeactivateAccountRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException {
    accountActionService.activateAccount(request.getId());
    return ResponseEntity.ok("Account " + request.getId() + " activated successful");
  }
}
