package org.banking_app.backend_banking_app.model.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "account_history")
public class AccountHistoryEntity {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "origin_id")
  private AccountEntity originAccount;

  @ManyToOne
  @JoinColumn(name = "destination_id")
  private AccountEntity destinationAccount;

  @Column(nullable = false)
  private String transactionType;

  @Column(nullable = false)
  private Double amount;

  private String message;

  private Double originBalanceBefore;

  private Double originBalanceAfter;

  private Double destinationBalanceBefore;

  private Double destinationBalanceAfter;

  private LocalDateTime timeStamp;
}
