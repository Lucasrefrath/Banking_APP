package org.banking_app.backend_banking_app.model.responseModel;

import lombok.Data;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;

import java.util.ArrayList;

@Data
public class AccountResponse {

  private AccountEntity accountDetails;

  //private ArrayList<AccountHistoryEntity> accountHistory;

}
