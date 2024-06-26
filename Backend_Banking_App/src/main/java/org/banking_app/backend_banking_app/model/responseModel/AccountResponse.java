package org.banking_app.backend_banking_app.model.responseModel;

import lombok.Data;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;

import java.util.ArrayList;
import java.util.List;

@Data
public class AccountResponse {

  private AccountEntity accountDetails;

  private List<AccountHistoryEntity> accountHistory;

}
