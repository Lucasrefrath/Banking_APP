package org.banking_app.backend_banking_app.service.account;


import org.banking_app.backend_banking_app.exceptions.customExceptions.NoSuchUserFoundException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.service.IBANIssuerService;
import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.banking_app.backend_banking_app.service.user.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountFactory {

  @Autowired
  private UserDataService userDataService;

  @Autowired
  IBANIssuerService ibanService;

  public AccountEntity createNewAccountEntity(String name) throws NoSuchUserFoundException {
    return new AccountEntity(
            userDataService.getUserByUsername(JpaUserDetailsService.getAuthenticatedUserDetails().getUsername()),
            name,
            ibanService.createIBAN()
    );
  }

}
