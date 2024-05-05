package org.banking_app.backend_banking_app.controller;

import jakarta.servlet.http.HttpSession;
import org.banking_app.backend_banking_app.model.SessionUserModel;
import org.banking_app.backend_banking_app.service.JpaUserDetailsService;
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

  @PostMapping("/login")
  public ResponseEntity<SessionUserModel> login() {
    return ResponseEntity.ok(new SessionUserModel());
  }

  @PostMapping("/logout")
  public ResponseEntity<String> logout(HttpSession session, Principal principal) {
    session.invalidate();
    return ResponseEntity.ok("User: " + principal.getName() + " was logged out successfully.");
  }

  @GetMapping("/checkAuth")
  public ResponseEntity<SessionUserModel> checkAuth(Principal principal) {
    if(principal == null) {
      return ResponseEntity.status(401).build();
    }
    return ResponseEntity.ok(new SessionUserModel());
  }

  @GetMapping("/userdetails")
  public ResponseEntity<UserDetails> getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.ok(userDetails);
  }
}
