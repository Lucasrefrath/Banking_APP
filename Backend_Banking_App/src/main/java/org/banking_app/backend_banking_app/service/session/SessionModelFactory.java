package org.banking_app.backend_banking_app.service.session;

import org.banking_app.backend_banking_app.model.SessionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class SessionModelFactory {

  @Autowired
  private SessionDataService sessionDataService;

  public List<SessionModel> buildAll(List<? extends Session> sessions) {
    List<SessionModel> result = new ArrayList<>();
    for(Session session : sessions) {
      result.add(
      new SessionModel(
              session,
              Objects.equals(sessionDataService.getActiveSessionId(), session.getId())
      )
      );
    }
    return result;
  }

  public SessionModel build(Session session) {
    return new SessionModel(
            session,
            Objects.equals(sessionDataService.getActiveSessionId(), session.getId())
    );
  }

}
