package org.banking_app.backend_banking_app.service.dataService;

import lombok.Data;
import org.banking_app.backend_banking_app.exceptions.IdNotNullException;
import org.banking_app.backend_banking_app.exceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.NoSuchUserFoundException;
import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.banking_app.backend_banking_app.service.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class AccountService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private UserService userService;

  public AccountEntity createAccount(AccountEntity entity) throws IdNotNullException {
    if(entity.getId() != null) throw new IdNotNullException(entity.getId());
    return accountRepository.save(entity);
  }

  public AccountEntity createAccount(AccountEntity entity, String ownerName) throws NoSuchUserFoundException, IdNotNullException {
    entity.setOwner(userService.getUserByUsername(ownerName));
    return createAccount(entity);
  }

  public List<AccountEntity> getCurrentAuthenticatedUsersAccounts() {
    SecurityUserDetails userDetails = JpaUserDetailsService.getAuthenticatedUserDetails();
    return accountRepository.findAllByOwner_Id(userDetails.getUserId());
  }

  public AccountEntity getAccountById(Long accountId) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountEntity entity = accountRepository.findById(accountId).orElseThrow(() -> new IllegalIdentifierException(accountId));
    SecurityUserDetails userDetails = JpaUserDetailsService.getAuthenticatedUserDetails();

    if(!(entity.getOwner().getId()).equals(userDetails.getUserId())) {
      throw new UserAccessNotAllowedException();
    }

    return entity;
  }

}
