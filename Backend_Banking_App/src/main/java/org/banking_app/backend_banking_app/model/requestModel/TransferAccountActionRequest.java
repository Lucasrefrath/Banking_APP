package org.banking_app.backend_banking_app.model.requestModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TransferAccountActionRequest extends BasicAccountActionRequest{

  private String message;

  private Long recipientId;

}
