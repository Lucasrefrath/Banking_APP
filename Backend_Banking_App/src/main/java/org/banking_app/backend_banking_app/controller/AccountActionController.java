package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.exceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.NotEnoughBalanceException;
import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.requestModel.BasicAccountActionRequest;
import org.banking_app.backend_banking_app.model.requestModel.TransferAccountActionRequest;
import org.banking_app.backend_banking_app.model.responseModel.AccountActionResponse;
import org.banking_app.backend_banking_app.service.dataService.AccountService;
import org.banking_app.backend_banking_app.service.dataService.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/account/actions")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class AccountActionController {

  @Autowired
  AccountService accountService;

  @Autowired
  HistoryService historyService;

  @PostMapping(value = "/deposit")
  public ResponseEntity<AccountActionResponse> deposit(@RequestBody BasicAccountActionRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountActionResponse response = accountService.deposit(
            request.getAccountId(),
            request.getAmount()
    );

    return ResponseEntity.ok(response);
  }

  @PostMapping("/withdraw")
  public ResponseEntity<AccountActionResponse> withdraw(@RequestBody BasicAccountActionRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException, NotEnoughBalanceException {
    AccountActionResponse response = accountService.withdraw(
                    request.getAccountId(),
                    request.getAmount()
    );

    return ResponseEntity.ok(response);
  }

  @PostMapping("/transfer")
  public ResponseEntity<AccountActionResponse> transfer(@RequestBody TransferAccountActionRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException, NotEnoughBalanceException {
    AccountActionResponse response = accountService.transfer(
            request.getAccountId(),
            request.getAmount(),
            request.getRecipientId(),
            request.getMessage()
    );

    return ResponseEntity.ok(response);
  }
}
