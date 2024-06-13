package org.banking_app.backend_banking_app.service.account;

import org.banking_app.backend_banking_app.exceptions.customExceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.banking_app.backend_banking_app.service.auth.AuthorisationService;
import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.banking_app.backend_banking_app.service.SortingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AccountDataService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private SortingService sortingService;

  @Autowired
  private AuthorisationService authorisationService;

  public List<AccountEntity> getCurrentAuthenticatedUsersAccounts() {
    SecurityUserDetails userDetails = JpaUserDetailsService.getAuthenticatedUserDetails();
    return getAllActiveByUser(userDetails.getUserId());
  }

  public List<AccountEntity> getAllActiveByUser(Long userId) {
    List<AccountEntity> allByOwnerId = accountRepository.findAllByOwner_IdAndActive(userId, true);
    return sortingService.sortAccountsById(allByOwnerId);
  }

  public List<AccountEntity> getAllByUser(Long userId) {
    List<AccountEntity> allByOwnerId = accountRepository.findAllByOwner_Id(userId);
    return sortingService.sortAccountsById(allByOwnerId);
  }

  public AccountEntity getAccountById(Long accountId) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountEntity entity = getAccountByIdUnsecured(accountId);
    authorisationService.checkAccountOwnership(accountId);

    return entity;
  }

  public AccountEntity getAccountByIdUnsecured(Long accountId) throws IllegalIdentifierException {
    return accountRepository.findById(accountId).orElseThrow(() -> new IllegalIdentifierException(accountId));
  }
}
