package org.banking_app.backend_banking_app.service.dataService;

import lombok.Data;
import org.banking_app.backend_banking_app.exceptions.*;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.model.responseModel.AccountActionResponse;
import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.banking_app.backend_banking_app.service.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    AccountEntity entity = getAccountByIdUnsecured(accountId);
    SecurityUserDetails userDetails = JpaUserDetailsService.getAuthenticatedUserDetails();

    if(!(entity.getOwner().getId()).equals(userDetails.getUserId())) {
      throw new UserAccessNotAllowedException();
    }

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
}
