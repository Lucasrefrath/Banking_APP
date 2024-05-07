package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.banking_app.backend_banking_app.repository.UserRepository;
import org.banking_app.backend_banking_app.service.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("http://localhost:3000/")
public class TestController {

  @Autowired
  JpaUserDetailsService userDetailsService;

  @Autowired
  AccountRepository accountRepository;

  @Autowired
  UserRepository userRepository;

  @GetMapping("/open")
  public String open() {
    return "Welcome";
  }

  @GetMapping("/user")
  public String user(Principal principal) {
    return "Welcome User: " + principal.getName();
  }

  @GetMapping("/admin")
  public String admin(Principal principal) {
    return "Welcome admin: " + principal.getName();
  }

  @GetMapping("/test")
  public Optional<UserEntity> getUser() {
    return userRepository.findByUsername("admin");
  }

  @GetMapping("/accounts")
  public ResponseEntity<List<AccountEntity>> getAllAccounts() {
    return ResponseEntity.ok().body(accountRepository.findAll());
  }
}
