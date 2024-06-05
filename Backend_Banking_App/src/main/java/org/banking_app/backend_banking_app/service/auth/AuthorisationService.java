package org.banking_app.backend_banking_app.service.auth;

import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.exceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.service.account.AccountDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@NoArgsConstructor
public class AuthorisationService {

  @Autowired
  AccountDataService accountDataService;

  public void checkAccountOwnership(Long accountId) throws IllegalIdentifierException, UserAccessNotAllowedException {
    if(userIsAdmin()) return;

    SecurityUserDetails authenticatedUserDetails = JpaUserDetailsService.getAuthenticatedUserDetails();
    AccountEntity account = accountDataService.getAccountByIdUnsecured(accountId);

    if(!Objects.equals(account.getOwner().getId(), authenticatedUserDetails.getUserId())) throw new UserAccessNotAllowedException();
  }

  public void checkUserAdmin() throws UserAccessNotAllowedException {
    if(!userIsAdmin()) throw new UserAccessNotAllowedException();
  }

  private boolean userIsAdmin() {
    return JpaUserDetailsService.getAuthenticatedUserDetails().hasAuthority("ROLE_ADMIN");
  }

}
