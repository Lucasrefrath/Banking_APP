package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.exceptions.customExceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NotEnoughBalanceException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.AccountActionApprovalStatusModel;
import org.banking_app.backend_banking_app.model.requestModel.BasicAccountActionRequest;
import org.banking_app.backend_banking_app.model.requestModel.TransferAccountActionRequest;
import org.banking_app.backend_banking_app.model.responseModel.AccountActionResponse;
import org.banking_app.backend_banking_app.service.account.accountAction.AccountActionApprovalService;
import org.banking_app.backend_banking_app.service.account.accountAction.AccountActionService;
import org.banking_app.backend_banking_app.service.account.AccountDataService;
import org.banking_app.backend_banking_app.service.accountHistory.AccountHistoryDataService;
import org.banking_app.backend_banking_app.service.auth.MobileAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/account/actions")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class AccountActionController {

  @Autowired
  AccountDataService accountDataService;

  @Autowired
  AccountActionService accountActionService;

  @Autowired
  AccountHistoryDataService accountHistoryDataService;

  @Autowired
  MobileAuthenticationService mobileAuthenticationService;

  @Autowired
  AccountActionApprovalService accountActionApprovalService;

  @PostMapping(value = "/deposit")
  public ResponseEntity<AccountActionResponse> deposit(@RequestBody BasicAccountActionRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountActionResponse response = accountActionService.deposit(
            request.getAccountId(),
            request.getAmount()
    );

    return ResponseEntity.ok(response);
  }

  @PostMapping("/withdraw")
  public ResponseEntity<AccountActionResponse> withdraw(@RequestBody BasicAccountActionRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException, NotEnoughBalanceException {
    AccountActionResponse response = accountActionService.withdraw(
                    request.getAccountId(),
                    request.getAmount()
    );

    return ResponseEntity.ok(response);
  }

  @PostMapping("/transfer")
  public ResponseEntity transfer(@RequestBody TransferAccountActionRequest request) throws IllegalIdentifierException, UserAccessNotAllowedException, NotEnoughBalanceException {
    if(mobileAuthenticationService.currentUserHasMobileAuthentication()) {
      AccountActionApprovalStatusModel accountActionApprovalStatusModel = accountActionApprovalService.registerTransfer(
              request.getAccountId(),
              request.getAmount(),
              request.getRecipientId(),
              request.getMessage()
      );
      System.out.println(accountActionApprovalStatusModel.toString());
      return ResponseEntity.status(307).body(accountActionApprovalStatusModel);
    }
    return ResponseEntity.ok(accountActionService.transfer(
            request.getAccountId(),
            request.getAmount(),
            request.getRecipientId(),
            request.getMessage()
    ));
  }
}
