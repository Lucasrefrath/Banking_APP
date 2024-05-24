package org.banking_app.backend_banking_app.model.responseModel;

import lombok.Data;
import org.banking_app.backend_banking_app.model.AccountSearchResultModel;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;

import java.util.List;

@Data
public class AccountFastSearchResponse {

  private List<AccountSearchResultModel> response;

}
