package org.banking_app.backend_banking_app.model.responseModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;

@Data
@AllArgsConstructor
public class AccountActionResponse {

  private AccountEntity updatedAccountData;

  private AccountHistoryEntity newHistoryData;

}
