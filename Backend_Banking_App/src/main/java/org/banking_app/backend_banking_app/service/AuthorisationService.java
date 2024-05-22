package org.banking_app.backend_banking_app.service;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.exceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.service.dataService.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@NoArgsConstructor
public class AuthorisationService {

  @Autowired
  AccountService accountService;

  public void checkAccountOwnership(Long accountId) throws IllegalIdentifierException, UserAccessNotAllowedException {
    SecurityUserDetails authenticatedUserDetails = JpaUserDetailsService.getAuthenticatedUserDetails();
    AccountEntity account = accountService.getAccountByIdUnsecured(accountId);
    if(!Objects.equals(account.getOwner().getId(), authenticatedUserDetails.getUserId())) throw new UserAccessNotAllowedException();
  }

}
