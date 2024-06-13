package org.banking_app.backend_banking_app.service.session;

import jakarta.servlet.http.HttpSession;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NoSuchUserFoundException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAndPasswordDoNotMatchException;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.model.requestModel.LogInRequest;
import org.banking_app.backend_banking_app.repository.UserRepository;
import org.banking_app.backend_banking_app.service.auth.AuthorisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;

@Service
public class SessionActionService {

  @Autowired
  private FindByIndexNameSessionRepository<? extends Session> sessionRepository;

  @Autowired
  AuthorisationService authorisationService;

  @Autowired
  SessionDataService sessionDataService;

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  SessionAttributeService sessionAttributeService;

  @Autowired
  private UserRepository userRepository;

  public void create(LogInRequest request) throws UsernameAndPasswordDoNotMatchException, NoSuchUserFoundException {
    UserEntity byUsername = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new NoSuchUserFoundException(request.getUsername()));
    System.out.println("after");
    try {
      System.out.println("checking cred");
      HttpSession session = sessionDataService.getCurrentHttpSession();
      Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);

      session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

      sessionAttributeService.setDefaultAttributes(request);
    } catch (Throwable e) {
      throw new UsernameAndPasswordDoNotMatchException();
    }
  }

  public void terminateSession(String sessionId) throws UserAccessNotAllowedException {
    authorisationService.checkSessionClearance(sessionId);
    sessionRepository.deleteById(sessionId);
  }

}
