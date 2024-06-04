package org.banking_app.backend_banking_app.service.account;

import org.banking_app.backend_banking_app.exceptions.*;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.banking_app.backend_banking_app.model.responseModel.AccountActionResponse;
import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.banking_app.backend_banking_app.service.accountHistory.AccountHistoryDataService;
import org.banking_app.backend_banking_app.service.accountHistory.AccountHistoryLoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountActionService {

  @Autowired
  AccountDataService accountDataService;

  @Autowired
  AccountFactory accountFactory;

  @Autowired
  AccountRepository accountRepository;

  @Autowired
  AccountLimitationService accountLimitationService;

  @Autowired
  AccountHistoryDataService accountHistoryDataService;

  @Autowired
  AccountHistoryLoggingService accountHistoryLoggingService;

  public AccountEntity createAccount(String name) throws IdNotNullException, NoSuchUserFoundException, NumberOfAccountsLimitedException {
    AccountEntity account = accountFactory.createNewAccountEntity(name);
    return createAccount(account);
  }

  public AccountEntity createAccount(AccountEntity entity) throws IdNotNullException, NumberOfAccountsLimitedException {
    if(entity.getId() != null) throw new IdNotNullException(entity.getId());
    accountLimitationService.checkCreateAccount();
    return accountRepository.save(entity);
  }

  public void deactivateAccount(Long accountId) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountEntity account = accountDataService.getAccountById(accountId);
    account.deactivate();
    accountRepository.save(account);
  }

  public void activateAccount(Long accountId) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountEntity account = accountDataService.getAccountById(accountId);
    account.activate();
    accountRepository.save(account);
  }

  public AccountActionResponse deposit(Long accountId, Double amount) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountEntity destinationAccount = accountDataService.getAccountById(accountId);
    Double balanceBefore = destinationAccount.getBalance();

    destinationAccount.deposit(amount);
    accountRepository.save(destinationAccount);

    AccountHistoryEntity history = accountHistoryLoggingService.logDepositAction(
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
    AccountEntity originAccount = accountDataService.getAccountById(accountId);
    Double originBalanceBefore = originAccount.getBalance();

    originAccount.withdraw(amount);
    accountRepository.save(originAccount);

    AccountHistoryEntity history = accountHistoryLoggingService.logWithdrawAction(
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
    AccountEntity fromAccount = accountDataService.getAccountById(accountId);
    AccountEntity toAccount = accountDataService.getAccountByIdUnsecured(recipientId);

    Double originBalanceBefore = fromAccount.getBalance();
    Double destinationBalanceBefore = toAccount.getBalance();

    fromAccount.withdraw(amount);
    toAccount.deposit(amount);

    accountRepository.save(fromAccount);
    accountRepository.save(toAccount);

    AccountHistoryEntity history = accountHistoryLoggingService.logTransferAction(
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
