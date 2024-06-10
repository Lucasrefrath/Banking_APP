package org.banking_app.backend_banking_app.model.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.enums.SignUpRequestStatus;
import org.banking_app.backend_banking_app.exceptions.NotEnoughBalanceException;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "signup_request")
@AllArgsConstructor
public class SignUpRequestEntity {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String username;

  @JsonIgnore
  @Column(nullable = false)
  private String password;

  private SignUpRequestStatus status = SignUpRequestStatus.PENDING;

  private LocalDateTime processedAt;

  private String rejectionMessage;

  private LocalDateTime createdAt;

  public SignUpRequestEntity(String username, String password) {
    this.username = username;
    this.password = password;
  }
}
