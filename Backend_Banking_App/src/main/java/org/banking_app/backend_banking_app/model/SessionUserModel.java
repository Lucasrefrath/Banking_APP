package org.banking_app.backend_banking_app.model;

import lombok.Data;
import org.banking_app.backend_banking_app.service.JpaUserDetailsService;

import java.util.ArrayList;

@Data
public class SessionUserModel {

  private Long id;
  private String username;
  private ArrayList<String> roles = new ArrayList<>();

  public SessionUserModel() {
    SecurityUserDetails userDetails = JpaUserDetailsService.getAuthenticatedUserDetails();

    this.username = userDetails.getUsername();
    this.id = userDetails.getUserId();
    userDetails.getAuthorities().forEach(x -> roles.add(x.getAuthority()));
  }
}

