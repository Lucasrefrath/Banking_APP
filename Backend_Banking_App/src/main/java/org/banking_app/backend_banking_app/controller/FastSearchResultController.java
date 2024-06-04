package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.model.requestModel.AccountFastSearchRequest;
import org.banking_app.backend_banking_app.model.responseModel.AccountFastSearchResponse;
import org.banking_app.backend_banking_app.service.account.AccountSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/fastSearch")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class FastSearchResultController {

  @Autowired
  AccountSearchService accountSearchService;

  @PostMapping("/accounts")
  public ResponseEntity<AccountFastSearchResponse> searchForAccounts(@RequestBody AccountFastSearchRequest request) {
    AccountFastSearchResponse response = new AccountFastSearchResponse();
    response.setResponse(accountSearchService.searchForAccounts(
            request.getQuery(),
            request.getOriginAccountId()
    ));
    return ResponseEntity.ok(response);
  }

}
