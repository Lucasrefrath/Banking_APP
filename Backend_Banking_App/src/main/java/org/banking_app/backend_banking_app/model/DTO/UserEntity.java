package org.banking_app.backend_banking_app.model.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "username_unique",
                        columnNames = "username"
                )
        }
)
public class UserEntity implements Serializable {

  public UserEntity(String username, String password, String roles) {
    this.username = username;
    this.password = password;
    this.roles = roles;
  }

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String username;

  @JsonIgnore
  private String password;

  private String roles;

  @Override
  public String toString() {
    return "UserEntity{" +
            "id=" + id +
            ", username='" + username + '\'' +
            ", roles='" + roles + '\'' +
            '}';
  }
}
