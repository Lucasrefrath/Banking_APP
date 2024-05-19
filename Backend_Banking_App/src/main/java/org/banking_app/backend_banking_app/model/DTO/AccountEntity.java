package org.banking_app.backend_banking_app.model.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.exceptions.NotEnoughBalanceException;

@Data
@NoArgsConstructor
@Entity
@Table(name = "accounts")
public class AccountEntity {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Double balance = 0.0;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "owner_id", nullable = false)
  private UserEntity owner;

  public AccountEntity(Double balance, UserEntity owner) {
    this.balance = balance;
    this.owner = owner;
  }

  public void deposit(Double amount) {
    balance += amount;
  }

  public void withdraw(Double amount) throws NotEnoughBalanceException {
    if(amount > balance) {
      throw new NotEnoughBalanceException(amount, balance);
    }
    balance -= amount;
  }
}
