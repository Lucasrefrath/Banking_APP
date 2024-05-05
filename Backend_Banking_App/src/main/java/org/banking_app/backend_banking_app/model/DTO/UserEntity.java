package org.banking_app.backend_banking_app.model.DTO;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class UserEntity implements Serializable {

  public UserEntity(String username, String password, String roles) {
    this.username = username;
    this.password = password;
    this.roles = roles;
  }

  @Id @GeneratedValue
  private Long id;

  private String username;

  private String password;

  private String roles;

}
