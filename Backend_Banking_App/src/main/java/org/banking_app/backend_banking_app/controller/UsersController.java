package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.model.FullUserDataModel;
import org.banking_app.backend_banking_app.service.FullUserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class UsersController {

  @Autowired
  FullUserDataService fullUserDataService;

  @GetMapping
  public ResponseEntity<List<FullUserDataModel>> getAllUsers() {
    return ResponseEntity.ok(fullUserDataService.getAllUserData());
  }

}
