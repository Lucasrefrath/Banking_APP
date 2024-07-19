package org.banking_app.backend_banking_app.service.account.accountAction;

import org.banking_app.backend_banking_app.exceptions.customExceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NoSuchAccountActionApprovalFoundException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NotEnoughBalanceException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.AccountActionApprovalStatusModel;
import org.banking_app.backend_banking_app.model.DTO.AccountActionApprovalEntity;
import org.banking_app.backend_banking_app.repository.AccountActionApprovalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountActionApprovalService {

  @Autowired
  AccountActionApprovalRepository accountActionApprovalRepository;

  public AccountActionApprovalStatusModel registerDeposit(Long accountId, Double amount) throws IllegalIdentifierException, UserAccessNotAllowedException {
    AccountActionApprovalEntity newDeposit = AccountActionApprovalFactory.getNewDeposit(accountId, amount);
    AccountActionApprovalEntity save = accountActionApprovalRepository.save(newDeposit);
    return new AccountActionApprovalStatusModel(save);
  }

  public AccountActionApprovalStatusModel registerWithdraw(Long accountId, Double amount) throws IllegalIdentifierException, UserAccessNotAllowedException, NotEnoughBalanceException {
    AccountActionApprovalEntity newWithDraw = AccountActionApprovalFactory.getNewWithDraw(accountId, amount);
    AccountActionApprovalEntity save = accountActionApprovalRepository.save(newWithDraw);
    return new AccountActionApprovalStatusModel(save);
  }

  public AccountActionApprovalStatusModel registerTransfer(Long accountId, Double amount, Long recipientId, String message) {
    AccountActionApprovalEntity newTransfer = AccountActionApprovalFactory.getNewTransfer(accountId, amount, recipientId, message);
    AccountActionApprovalEntity save = accountActionApprovalRepository.save(newTransfer);
    return new AccountActionApprovalStatusModel(save);
  }

  public AccountActionApprovalStatusModel getStatus(Long approvalId) throws NoSuchAccountActionApprovalFoundException {
    AccountActionApprovalEntity byId = accountActionApprovalRepository.findById(approvalId).orElseThrow(NoSuchAccountActionApprovalFoundException::new);
    return new AccountActionApprovalStatusModel(byId);
  }

  public void approve(Long approvalId) {

  }

  public void reject(Long approvalId) {

  }

}
