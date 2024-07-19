package org.banking_app.backend_banking_app.model.DTO;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.enums.AccountActionType;
import org.banking_app.backend_banking_app.enums.ApprovalStatus;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Data
@Table(name = "account_action_approval")
public class AccountActionApprovalEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long accountID;

  private Double amount;

  private Long recipientId;

  private String message;

  private AccountActionType actionType;

  private LocalDateTime validUntil = LocalDateTime.now().plusMinutes(5);

  private ApprovalStatus status = ApprovalStatus.PENDING;

}
