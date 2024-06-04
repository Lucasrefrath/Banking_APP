package org.banking_app.backend_banking_app.model.DTO;

import lombok.Data;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;

@Getter
public class UserModel {

  private Long id;

  private String username;

  private List<String> roles;

  public UserModel(UserEntity userEntity) {
    this.id = userEntity.getId();
    this.username = userEntity.getUsername();
    this.roles = Arrays.stream(userEntity.getRoles().split(",")).toList();
  }
}
