package org.banking_app.backend_banking_app.service.dataService;

import org.banking_app.backend_banking_app.exceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.banking_app.backend_banking_app.repository.AccountHistoryRepository;
import org.banking_app.backend_banking_app.service.factory.AccountHistoryFactory;
import org.banking_app.backend_banking_app.service.SortingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

  @Autowired
  private AccountHistoryRepository accountHistoryRepository;

  @Autowired
  AccountService accountService;

  @Autowired
  SortingService sortingService;

  public List<AccountHistoryEntity> getHistoryForAccount(Long accountId) {
    List<AccountHistoryEntity> destinationHistory = accountHistoryRepository.findAllByDestinationAccountId(accountId);
    List<AccountHistoryEntity> originHistory = accountHistoryRepository.findAllByOriginAccountId(accountId);

    destinationHistory.addAll(originHistory);

    return sortingService.sortByTimeStamp(destinationHistory);
  }

  public AccountHistoryEntity logDepositAction(AccountEntity destinationAccount, Double amount, Double destinationBalanceBefore) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountHistoryEntity entity = AccountHistoryFactory.createDepositEntity(
            destinationAccount,
            amount,
            destinationBalanceBefore
    );

    accountHistoryRepository.save(entity);
    return entity;
  }

  public AccountHistoryEntity logWithdrawAction(AccountEntity originAccount, Double amount, Double originBalanceBefore) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountHistoryEntity entity = AccountHistoryFactory.createWithdrawEntity(
            originAccount,
            amount,
            originBalanceBefore
    );

    accountHistoryRepository.save(entity);
    return entity;
  }

  public AccountHistoryEntity logTransferAction(AccountEntity originAccount, AccountEntity destinationAccount, Double amount, String message,
                                                Double originBalanceBefore, Double destinationBalanceBefore) {
    AccountHistoryEntity entity = AccountHistoryFactory.createTransferEntity(
            originAccount,
            destinationAccount,
            amount,
            message,
            originBalanceBefore,
            destinationBalanceBefore
    );

    accountHistoryRepository.save(entity);
    return entity;
  }
}
