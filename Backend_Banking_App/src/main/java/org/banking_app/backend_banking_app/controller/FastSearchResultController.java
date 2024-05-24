package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.model.responseModel.AccountFastSearchResponse;
import org.banking_app.backend_banking_app.service.dataService.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/fastSearch")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class FastSearchResultController {

  @Autowired
  AccountService accountService;

  @GetMapping("/accounts")
  public ResponseEntity<AccountFastSearchResponse> searchForAccounts(@RequestParam("q") String query) {
    AccountFastSearchResponse response = new AccountFastSearchResponse();
    response.setResponse(accountService.getAccountSearchResultsBySearchQuery(query));
    return ResponseEntity.ok(response);
  }

}
