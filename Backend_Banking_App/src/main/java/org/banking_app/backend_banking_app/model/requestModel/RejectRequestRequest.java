package org.banking_app.backend_banking_app.model.requestModel;

import lombok.Data;

@Data
public class RejectRequestRequest {

  private Long requestId;

  private String reason;
}

