package org.banking_app.backend_banking_app.controller;

import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.UserSessionsOverview;
import org.banking_app.backend_banking_app.service.session.SessionActionService;
import org.banking_app.backend_banking_app.service.session.SessionDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.session.Session;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sessions")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class SessionController {

  @Autowired
  SessionDataService sessionDataService;

  @Autowired
  SessionActionService sessionActionService;

  @GetMapping("/sessions/{username}")
  public List<? extends Session> getSessionsByUsername(@PathVariable String username) throws UserAccessNotAllowedException {
    return sessionDataService.getSessionsByUsername(username);
  }

  @GetMapping("/mySessions")
  public List<? extends Session> getCurrentUsersSession() {
    return sessionDataService.getActiveUsersSessions();
  }

  @GetMapping("/allSessions")
  public List<UserSessionsOverview> getAllActiveSessions() throws UserAccessNotAllowedException {
    return sessionDataService.getAllActiveSessions();
  }

  @DeleteMapping("/terminate/{sessionId}")
  public ResponseEntity terminateSession(@PathVariable String sessionId) throws UserAccessNotAllowedException {
    sessionActionService.terminateSession(sessionId);
    return ResponseEntity.ok("Session "+sessionId+" terminated.");
  }

}
