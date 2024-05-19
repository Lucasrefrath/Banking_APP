package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.exceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.NotEnoughBalanceException;
import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.requestModel.BasicAccountActionRequest;
import org.banking_app.backend_banking_app.model.requestModel.TransferAccountActionRequest;
import org.banking_app.backend_banking_app.service.dataService.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/account/actions")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class AccountActionController {

  @Autowired
  AccountService accountService;

  @PostMapping(value = "/deposit")
  public ResponseEntity deposit(@RequestBody BasicAccountActionRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException {
    return ResponseEntity.ok(
            accountService.deposit(
                    request.getAccountId(),
                    request.getAmount()
            )
    );
  }

  @PostMapping("/withdraw")
  public ResponseEntity withdraw(@RequestBody BasicAccountActionRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException, NotEnoughBalanceException {
    return ResponseEntity.ok(
            accountService.withdraw(
                    request.getAccountId(),
                    request.getAmount()
            )
    );
  }

  @PostMapping("/transfer")
  public ResponseEntity transfer(@RequestBody TransferAccountActionRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException, NotEnoughBalanceException {
    return ResponseEntity.ok(
            accountService.transfer(
                    request.getAccountId(),
                    request.getAmount(),
                    request.getRecipientId()
            )
    );
  }
}
