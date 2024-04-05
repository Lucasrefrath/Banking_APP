package org.banking_app.backend_banking_app.controller;

import jakarta.servlet.http.HttpSession;
import org.banking_app.backend_banking_app.model.requestModel.LogInRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1")
public class TestController {

  @Autowired
  AuthenticationManager authenticationManager;

  @GetMapping("/open")
  public String open() {
    return "Welcome";
  }

  @GetMapping("/user")
  public String user(Principal principal, HttpSession session) {
    System.out.println(session.getId());
    return "Welcome User: " + principal.getName();
  }

  @GetMapping("/check")
  public boolean user() {
    return true;
  }

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LogInRequest request, HttpSession session) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            request.getUsername(), request.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    return ResponseEntity.ok("Success");
  }

  @GetMapping("/admin")
  public String admin() {
    return "Welcome Admin";
  }
}
