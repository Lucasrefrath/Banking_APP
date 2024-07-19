package org.banking_app.backend_banking_app.service.account.accountAction;

import org.banking_app.backend_banking_app.enums.AccountActionType;
import org.banking_app.backend_banking_app.model.DTO.AccountActionApprovalEntity;

public class AccountActionApprovalFactory {

  public static AccountActionApprovalEntity getNewDeposit(Long accountId, Double amount) {
    AccountActionApprovalEntity entity = new AccountActionApprovalEntity();
    entity.setActionType(AccountActionType.DEPOSIT);
    entity.setAccountID(accountId);
    entity.setAmount(amount);
    return entity;
  }

  public static AccountActionApprovalEntity getNewWithDraw(Long accountId, Double amount) {
    AccountActionApprovalEntity entity = new AccountActionApprovalEntity();
    entity.setActionType(AccountActionType.WITHDRAW);
    entity.setAccountID(accountId);
    entity.setAmount(amount);
    return entity;
  }

  public static AccountActionApprovalEntity getNewTransfer(Long accountId, Double amount, Long recipientId, String message) {
    AccountActionApprovalEntity entity = new AccountActionApprovalEntity();
    entity.setActionType(AccountActionType.TRANSFER);
    entity.setAccountID(accountId);
    entity.setAmount(amount);
    entity.setRecipientId(recipientId);
    entity.setMessage(message);
    return entity;
  }

}
