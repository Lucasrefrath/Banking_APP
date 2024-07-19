package org.banking_app.backend_banking_app.model.DTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "mobile_authentication")
public class MobileAuthenticationEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  @Column(nullable = false)
  private String deviceUUID;

  @Column(nullable = false)
  private LocalDateTime createdAt;

  public MobileAuthenticationEntity(UserEntity user, String deviceUUID, LocalDateTime createdAt) {
    this.user = user;
    this.deviceUUID = deviceUUID;
    this.createdAt = createdAt;
  }
}
