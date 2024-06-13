package org.banking_app.backend_banking_app.service.account;

import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NumberOfAccountsLimitedException;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class AccountLimitationService {

  @Autowired
  private AccountRepository accountRepository;

  public void checkCreateAccount() throws NumberOfAccountsLimitedException {
    SecurityUserDetails authenticatedUser = JpaUserDetailsService.getAuthenticatedUserDetails();
    Long countAccounts = accountRepository.countAllByOwnerIdAndActive(authenticatedUser.getUserId(), true);
    if (authenticatedUser.hasAuthority("ROLE_ADMIN") && countAccounts > 9) throw new NumberOfAccountsLimitedException();
    if(authenticatedUser.hasAuthority("ROLE_USER") && countAccounts > 4) throw new NumberOfAccountsLimitedException();
  }

}
