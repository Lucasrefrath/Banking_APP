package org.banking_app.backend_banking_app.service;

import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;

import java.time.LocalDateTime;

public class AccountHistoryFactory {

  public static AccountHistoryEntity createDepositEntity(AccountEntity destinationAccount, Double amount, Double destinationBalanceBefore) {
    AccountHistoryEntity entity = new AccountHistoryEntity();

    entity.setAmount(amount);
    entity.setDestinationAccount(destinationAccount);
    entity.setTransactionType("DEPOSIT");
    entity.setDestinationBalanceBefore(destinationBalanceBefore);
    entity.setDestinationBalanceAfter(destinationAccount.getBalance());
    entity.setTimeStamp(LocalDateTime.now());

    return entity;
  }

  public static AccountHistoryEntity createWithdrawEntity(AccountEntity originAccount, Double amount, Double originBalanceBefore) {
    AccountHistoryEntity entity = new AccountHistoryEntity();

    entity.setAmount(amount);
    entity.setOriginAccount(originAccount);
    entity.setTransactionType("WITHDRAW");
    entity.setOriginBalanceBefore(originBalanceBefore);
    entity.setOriginBalanceAfter(originAccount.getBalance());
    entity.setTimeStamp(LocalDateTime.now());
    return entity;
  }

  public static AccountHistoryEntity createTransferEntity(AccountEntity originAccount, AccountEntity destinationAccount, Double amount, String message,
                                                          Double originBalanceBefore, Double destinationBalanceBefore) {
    AccountHistoryEntity entity = new AccountHistoryEntity();

    entity.setAmount(amount);
    entity.setOriginAccount(originAccount);
    entity.setDestinationAccount(destinationAccount);
    entity.setMessage(message);
    entity.setTransactionType("TRANSFER");

    entity.setOriginBalanceBefore(originBalanceBefore);
    entity.setOriginBalanceAfter(originAccount.getBalance());

    entity.setDestinationBalanceBefore(destinationBalanceBefore);
    entity.setDestinationBalanceAfter(destinationAccount.getBalance());

    entity.setTimeStamp(LocalDateTime.now());

    return entity;
  }

}
