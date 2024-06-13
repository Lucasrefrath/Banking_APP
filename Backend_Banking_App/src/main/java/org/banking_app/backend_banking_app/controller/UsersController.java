package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.FullUserDataModel;
import org.banking_app.backend_banking_app.model.requestModel.UpdateUserRolesRequest;
import org.banking_app.backend_banking_app.service.user.FullUserDataService;
import org.banking_app.backend_banking_app.service.user.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class UsersController {

  @Autowired
  FullUserDataService fullUserDataService;

  @Autowired
  UserDataService userDataService;

  @GetMapping
  public ResponseEntity<List<FullUserDataModel>> getAllUsers() throws UserAccessNotAllowedException {
    return ResponseEntity.ok(fullUserDataService.getAllUserData());
  }

  @PostMapping("/updateRoles")
  public ResponseEntity updateUserRoles(@RequestBody UpdateUserRolesRequest request) throws UserAccessNotAllowedException {
    userDataService.updateUserRoles(
            request.getUserId(),
            request.getUpdatedRoles()
    );
    return ResponseEntity.ok().build();
  }

}
