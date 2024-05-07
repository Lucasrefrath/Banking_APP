package org.banking_app.backend_banking_app.model.DTO;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "accounts")
public class AccountEntity {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Double balance = 0.0;

  @ManyToOne
  @JoinColumn(name = "owner_id", nullable = false)
  private UserEntity owner;

  public AccountEntity(Double balance, UserEntity owner) {
    this.balance = balance;
    this.owner = owner;
  }
}
