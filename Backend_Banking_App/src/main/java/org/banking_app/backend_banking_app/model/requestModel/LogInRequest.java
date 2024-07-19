package org.banking_app.backend_banking_app.model.requestModel;

import lombok.Data;

@Data
public class LogInRequest {
  private String username;

  private String password;
  
  private String clientLocation;

  private String clientBrowser;

  private String clientOS;

  private String deviceUUID;
}
