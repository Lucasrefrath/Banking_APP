package org.banking_app.backend_banking_app.model.requestModel;

import lombok.Data;

@Data
public class BasicAccountActionRequest {

  private Double amount;

  private Long accountId;

}
