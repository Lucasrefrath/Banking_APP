package org.banking_app.backend_banking_app.service.session;

import jakarta.servlet.http.HttpSession;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.model.UserSessionsOverview;
import org.banking_app.backend_banking_app.service.SortingService;
import org.banking_app.backend_banking_app.service.auth.AuthorisationService;
import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.banking_app.backend_banking_app.service.user.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.*;

@Service
public class SessionDataService {


  @Autowired
  private FindByIndexNameSessionRepository<? extends  Session> sessionRepository;

  @Autowired
  private UserDataService userDataService;

  @Autowired
  private SessionModelFactory sessionModelFactory;

  @Autowired
  AuthorisationService authorisationService;

  @Autowired
  SortingService sortingService;


  public List<? extends Session> getActiveUsersSessions() {
    List<? extends Session> sessions = sessionRepository.findByPrincipalName(JpaUserDetailsService.getAuthenticatedUserDetails().getUsername()).values().stream().toList();
    return sortingService.sortSessions(sessionModelFactory.buildAll(sessions));
  }

  public HttpSession getCurrentHttpSession() {
    ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
    return attributes.getRequest().getSession(true);
  }

  public String getActiveSessionId() {
    return Objects.requireNonNull(RequestContextHolder.getRequestAttributes()).getSessionId();
  }

  public List<? extends Session> getSessionsByUsername(String username) throws UserAccessNotAllowedException {
    authorisationService.checkUserAdmin();
    List<? extends Session> sessions = sessionRepository.findByPrincipalName(username).values().stream().toList();
    return sortingService.sortSessions(sessionModelFactory.buildAll(sessions));
  }

  public List<UserSessionsOverview> getAllActiveSessions() throws UserAccessNotAllowedException {
    authorisationService.checkUserAdmin();

    List<UserEntity> allUsers = userDataService.getAll();
    List<UserSessionsOverview> userSessionsOverview = new ArrayList<>();

    for(UserEntity user : allUsers) {
      List<? extends Session> userSessions = sortingService.sortSessions(getSessionsByUsername(user.getUsername()));
      userSessionsOverview.add(new UserSessionsOverview(
              user,
              sessionModelFactory.buildAll(userSessions)
      ));
    }

    return userSessionsOverview;
  }
}
