package org.banking_app.backend_banking_app.model.requestModel;

import lombok.Data;

@Data
public class AccountFastSearchRequest {

  private String query;

  private Long originAccountId;

}
