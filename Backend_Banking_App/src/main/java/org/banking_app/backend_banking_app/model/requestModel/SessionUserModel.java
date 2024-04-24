package org.banking_app.backend_banking_app.model.requestModel;

import lombok.Data;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;

@Data
public class SessionUserModel {

  private String username;
  private ArrayList<String> roles = new ArrayList<>();

  public SessionUserModel() {
    this.username = SecurityContextHolder.getContext().getAuthentication().getName();
    SecurityContextHolder.getContext().getAuthentication().getAuthorities().forEach(x -> roles.add(x.getAuthority()));
  }
}

