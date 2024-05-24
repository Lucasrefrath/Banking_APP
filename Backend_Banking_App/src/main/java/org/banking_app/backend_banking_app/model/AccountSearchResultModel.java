package org.banking_app.backend_banking_app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountSearchResultModel {

  private String iban;

  private String ownerName;

  private Long accountId;

}
