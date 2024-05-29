package org.banking_app.backend_banking_app.service.dataService;

import lombok.Data;
import org.banking_app.backend_banking_app.exceptions.*;
import org.banking_app.backend_banking_app.model.AccountSearchResultModel;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.model.responseModel.AccountActionResponse;
import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.banking_app.backend_banking_app.service.AccountLimitationService;
import org.banking_app.backend_banking_app.service.AuthorisationService;
import org.banking_app.backend_banking_app.service.JpaUserDetailsService;
import org.banking_app.backend_banking_app.service.SortingService;
import org.banking_app.backend_banking_app.service.factory.AccountFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Data
public class AccountService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private UserService userService;

  @Autowired
  HistoryService historyService;

  @Autowired
  SortingService sortingService;

  @Autowired
  AccountLimitationService accountLimitationService;

  @Autowired
  AuthorisationService authorisationService;

  @Autowired
  AccountFactory accountFactory;

  public AccountEntity createAccount(String name) throws IdNotNullException, NoSuchUserFoundException, NumberOfAccountsLimitedException {
    AccountEntity account = accountFactory.createNewAccountEntity(name);
    return createAccount(account);
  }

  public void deactivateAccount(Long accountId) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountEntity account = getAccountById(accountId);
    account.deactivate();
    accountRepository.save(account);
  }


  public AccountEntity createAccount(AccountEntity entity) throws IdNotNullException, NumberOfAccountsLimitedException {
    if(entity.getId() != null) throw new IdNotNullException(entity.getId());
    accountLimitationService.checkCreateAccount();
    return accountRepository.save(entity);
  }

  public List<AccountEntity> getCurrentAuthenticatedUsersAccounts() {
    SecurityUserDetails userDetails = JpaUserDetailsService.getAuthenticatedUserDetails();
    List<AccountEntity> allByOwnerId = accountRepository.findAllByOwner_IdAndActive(userDetails.getUserId(), true);
    return sortingService.sortById(allByOwnerId);
  }

  public AccountEntity getAccountById(Long accountId) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountEntity entity = getAccountByIdUnsecured(accountId);
    authorisationService.checkAccountOwnership(accountId);

    return entity;
  }

  public AccountEntity getAccountByIdUnsecured(Long accountId) throws IllegalIdentifierException {
    return accountRepository.findById(accountId).orElseThrow(() -> new IllegalIdentifierException(accountId));
  }

  public AccountActionResponse deposit(Long accountId, Double amount) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountEntity destinationAccount = getAccountById(accountId);
    Double balanceBefore = destinationAccount.getBalance();

    destinationAccount.deposit(amount);
    accountRepository.save(destinationAccount);

    AccountHistoryEntity history = historyService.logDepositAction(
            destinationAccount,
            amount,
            balanceBefore
    );

    return new AccountActionResponse(
            destinationAccount,
            history
    );
  }

  public AccountActionResponse withdraw(Long accountId, Double amount) throws IllegalIdentifierException, UserAccessNotAllowedException, NotEnoughBalanceException {
    AccountEntity originAccount = getAccountById(accountId);
    Double originBalanceBefore = originAccount.getBalance();

    originAccount.withdraw(amount);
    accountRepository.save(originAccount);

    AccountHistoryEntity history = historyService.logWithdrawAction(
            originAccount,
            amount,
            originBalanceBefore
    );

    return new AccountActionResponse(
            originAccount,
            history
    );
  }

  public AccountActionResponse transfer(Long accountId, Double amount, Long recipientId, String message) throws IllegalIdentifierException, UserAccessNotAllowedException, NotEnoughBalanceException {
    AccountEntity fromAccount = getAccountById(accountId);
    AccountEntity toAccount = getAccountByIdUnsecured(recipientId);

    Double originBalanceBefore = fromAccount.getBalance();
    Double destinationBalanceBefore = toAccount.getBalance();

    fromAccount.withdraw(amount);
    toAccount.deposit(amount);

    accountRepository.save(fromAccount);
    accountRepository.save(toAccount);

    AccountHistoryEntity history = historyService.logTransferAction(
            fromAccount,
            toAccount,
            amount,
            message,
            originBalanceBefore,
            destinationBalanceBefore
    );

    return new AccountActionResponse(
            fromAccount,
            history
    );
  }

  public List<AccountSearchResultModel> getAccountSearchResultsBySearchQuery(String searchQuery, Long originAccountId) {
    List<AccountEntity> ibanResults = accountRepository.findAllByIbanContainsIgnoreCaseAndActive(searchQuery, true);
    List<AccountEntity> nameResults = accountRepository.findAllByOwner_UsernameContainsIgnoreCaseAndActive(searchQuery, true);

    List<AccountSearchResultModel> resultList = new ArrayList<>();

    for(AccountEntity entity : ibanResults) {
      if(entity.getId().equals(originAccountId)) continue;

      resultList.add(
              new AccountSearchResultModel(
                      entity.getIban(),
                      entity.getOwner().getUsername(),
                      entity.getId()
              )
      );
    }

    for(AccountEntity entity : nameResults) {
      if(entity.getId().equals(originAccountId)) continue;
      
      resultList.add(
              new AccountSearchResultModel(
                      entity.getIban(),
                      entity.getOwner().getUsername(),
                      entity.getId()
              )
      );
    }

    return resultList;
  }
}
