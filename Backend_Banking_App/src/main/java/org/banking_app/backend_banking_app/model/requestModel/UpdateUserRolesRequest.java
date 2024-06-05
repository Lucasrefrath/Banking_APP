package org.banking_app.backend_banking_app.model.requestModel;

import lombok.Data;

import java.util.ArrayList;

@Data
public class UpdateUserRolesRequest {

  private Long userId;

  private ArrayList<String> updatedRoles;

}
