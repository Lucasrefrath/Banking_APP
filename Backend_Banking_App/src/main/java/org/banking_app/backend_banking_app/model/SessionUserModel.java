package org.banking_app.backend_banking_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.banking_app.backend_banking_app.service.auth.MobileAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Data
public class SessionUserModel {

  private Long id;
  private String username;
  private ArrayList<String> roles = new ArrayList<>();
  private boolean deviceIsMobileAuthentication = false;

  public SessionUserModel(Boolean deviceIsMobileAuthentication) {
    SecurityUserDetails userDetails = JpaUserDetailsService.getAuthenticatedUserDetails();

    this.deviceIsMobileAuthentication = deviceIsMobileAuthentication;

    this.username = userDetails.getUsername();
    this.id = userDetails.getUserId();
    userDetails.getAuthorities().forEach(x -> roles.add(x.getAuthority()));
  }
}

