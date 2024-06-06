package org.banking_app.backend_banking_app.service.auth;

import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.model.SessionModel;
import org.banking_app.backend_banking_app.model.UserSessionsOverview;
import org.banking_app.backend_banking_app.repository.UserRepository;
import org.banking_app.backend_banking_app.service.user.UserDataService;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;

import java.time.Duration;
import java.util.*;

@Service
public class SessionDataService {


  @Autowired
  private FindByIndexNameSessionRepository<? extends  Session> sessionRepository;

  @Autowired
  private UserDataService userDataService;

  @Autowired
  private SessionModelFactory sessionModelFactory;


  public List<? extends Session> getActiveSession() {
    return sessionRepository.findByPrincipalName(JpaUserDetailsService.getAuthenticatedUserDetails().getUsername()).values().stream().toList();
  }

  public String getActiveSessionId() {
    return Objects.requireNonNull(RequestContextHolder.getRequestAttributes()).getSessionId();
  }

  public List<? extends Session> getSessionsByUsername(String username) {
    return sessionRepository.findByPrincipalName(username).values().stream().toList();
  }

  public List<UserSessionsOverview> getAllActiveSessions() throws UserAccessNotAllowedException {
    List<UserEntity> allUsers = userDataService.getAll();
    List<UserSessionsOverview> userSessionsOverview = new ArrayList<>();

    for(UserEntity user : allUsers) {
      List<? extends Session> userSessions = getSessionsByUsername(user.getUsername());
      userSessionsOverview.add(new UserSessionsOverview(
              user,
              sessionModelFactory.buildAll(userSessions)
      ));
    }

    return userSessionsOverview;
  }
}
