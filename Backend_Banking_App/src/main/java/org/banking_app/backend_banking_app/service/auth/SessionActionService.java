package org.banking_app.backend_banking_app.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;

@Service
public class SessionActionService {

  @Autowired
  private SessionDataService sessionDataService;

  @Autowired
  private FindByIndexNameSessionRepository<? extends Session> sessionRepository;

  public void terminateSession(String sessionId) {
    sessionRepository.deleteById(sessionId);
  }

}
