package org.banking_app.backend_banking_app.model;

import lombok.Data;
import org.banking_app.backend_banking_app.enums.ApprovalStatus;
import org.banking_app.backend_banking_app.model.DTO.AccountActionApprovalEntity;

import java.time.LocalDateTime;

@Data
public class AccountActionApprovalStatusModel {

  private Long approvalId;

  private ApprovalStatus status;

  private LocalDateTime approveUntil;

  public AccountActionApprovalStatusModel(AccountActionApprovalEntity entity) {
    this.approvalId = entity.getId();
    this.status = entity.getStatus();
    this.approveUntil = entity.getValidUntil();
  }
}
