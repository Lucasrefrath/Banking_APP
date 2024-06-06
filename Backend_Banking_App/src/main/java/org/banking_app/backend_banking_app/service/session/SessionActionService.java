package org.banking_app.backend_banking_app.service.session;

import org.banking_app.backend_banking_app.exceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.service.auth.AuthorisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;

@Service
public class SessionActionService {

  @Autowired
  private FindByIndexNameSessionRepository<? extends Session> sessionRepository;

  @Autowired
  AuthorisationService authorisationService;

  public void terminateSession(String sessionId) throws UserAccessNotAllowedException {
    authorisationService.checkSessionClearance(sessionId);
    sessionRepository.deleteById(sessionId);
  }

}
