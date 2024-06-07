package org.banking_app.backend_banking_app.model;

import lombok.Data;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.UserModel;

import java.util.List;

@Data
public class FullUserDataModel {

  private UserModel user;

  private List<AccountEntity> accounts;

}
