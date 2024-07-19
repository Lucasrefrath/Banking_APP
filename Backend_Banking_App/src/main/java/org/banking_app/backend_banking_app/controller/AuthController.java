package org.banking_app.backend_banking_app.controller;

import jakarta.servlet.http.HttpSession;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NoSuchUserFoundException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAndPasswordDoNotMatchException;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.model.SessionUserModel;
import org.banking_app.backend_banking_app.model.requestModel.LogInRequest;
import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.banking_app.backend_banking_app.service.auth.MobileAuthenticationService;
import org.banking_app.backend_banking_app.service.session.SessionActionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/auth/v1")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class AuthController {

  @Autowired
  JpaUserDetailsService userDetailsService;

  @Autowired
  SessionActionService sessionActionService;

  @Autowired
  MobileAuthenticationService mobileAuthenticationService;

  private Logger log = LoggerFactory.getLogger(AuthController.class);

  @PostMapping("/login")
  public ResponseEntity<SessionUserModel> login(@RequestBody LogInRequest request) throws UsernameAndPasswordDoNotMatchException, NoSuchUserFoundException {
    sessionActionService.create(request);
    System.out.println(request.getDeviceUUID());
    log.info("{} logged in from {}", request.getUsername(), request.getClientOS());
    return ResponseEntity.ok(new SessionUserModel(mobileAuthenticationService.checkMobileAuthentication()));
  }

  @PostMapping("/logout")
  public ResponseEntity<String> logout(HttpSession session, @AuthenticationPrincipal SecurityUserDetails userDetails) {
    session.invalidate();
    return ResponseEntity.ok("User: " + userDetails.getUsername() + " was logged out successfully.");
  }

  @GetMapping("/checkAuth")
  public ResponseEntity<SessionUserModel> checkAuth(Principal principal) {
    if(principal == null) {
      log.info("unauthenticated");
      return ResponseEntity.status(401).build();
    }
    log.info("{} checkedAuth", principal.getName());
    return ResponseEntity.ok(new SessionUserModel(mobileAuthenticationService.checkMobileAuthentication()));
  }

  @GetMapping("/userdetails")
  public ResponseEntity<UserDetails> getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.ok(userDetails);
  }
}
