package org.banking_app.backend_banking_app.controller;

import jakarta.servlet.http.HttpSession;
import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.model.FullUserDataModel;
import org.banking_app.backend_banking_app.model.UserSessionsOverview;
import org.banking_app.backend_banking_app.model.requestModel.UpdateUserRolesRequest;
import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.banking_app.backend_banking_app.service.auth.SessionActionService;
import org.banking_app.backend_banking_app.service.auth.SessionDataService;
import org.banking_app.backend_banking_app.service.user.FullUserDataService;
import org.banking_app.backend_banking_app.service.user.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.session.Session;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class UsersController {

  @Autowired
  FullUserDataService fullUserDataService;

  @Autowired
  UserDataService userDataService;

  @Autowired
  SessionDataService sessionDataService;

  @Autowired
  SessionActionService sessionActionService;

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

  @GetMapping("/session/{username}")
  public List<? extends Session> getSession(@PathVariable String username) {
    return sessionDataService.getSessionsByUsername(username);
  }

  @GetMapping("/sessions")
  public List<? extends Session> getCurrentUsersSession() {
    return sessionDataService.getActiveSession();
  }

  @GetMapping("/allSessions")
  public List<UserSessionsOverview> getAllActiveSessions() throws UserAccessNotAllowedException {
    return sessionDataService.getAllActiveSessions();
  }

  @DeleteMapping("/terminate/{sessionId}")
  public ResponseEntity terminateSession(@PathVariable String sessionId) {
    sessionActionService.terminateSession(sessionId);
    return ResponseEntity.ok().build();
  }

}
