package org.banking_app.backend_banking_app.service.session;

import jakarta.servlet.http.HttpSession;
import org.banking_app.backend_banking_app.model.requestModel.LogInRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionAttributeService {

  @Autowired
  private SessionDataService sessionDataService;

  public void setDefaultAttributes(LogInRequest request) {
    HttpSession session = sessionDataService.getCurrentHttpSession();

    session.setAttribute("CLIENT_OS", request.getClientOS());
    session.setAttribute("CLIENT_BROWSER", request.getClientBrowser());
    session.setAttribute("CLIENT_LOCATION", request.getClientLocation());
  }

}
