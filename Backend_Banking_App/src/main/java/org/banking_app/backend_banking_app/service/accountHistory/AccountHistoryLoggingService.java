package org.banking_app.backend_banking_app.service.accountHistory;

import org.banking_app.backend_banking_app.exceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.banking_app.backend_banking_app.repository.AccountHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountHistoryLoggingService {

  @Autowired
  AccountHistoryRepository accountHistoryRepository;

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
