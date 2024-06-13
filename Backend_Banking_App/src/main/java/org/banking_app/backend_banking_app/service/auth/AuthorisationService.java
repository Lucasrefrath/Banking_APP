package org.banking_app.backend_banking_app.service.auth;

import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.exceptions.customExceptions.IllegalIdentifierException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.service.account.AccountDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@NoArgsConstructor
public class AuthorisationService {

  @Autowired
  AccountDataService accountDataService;

  @Autowired
  private FindByIndexNameSessionRepository<? extends Session> sessionRepository;

  public void checkAccountOwnership(Long accountId) throws IllegalIdentifierException, UserAccessNotAllowedException {
    if(userIsAdmin()) return;

    SecurityUserDetails authenticatedUserDetails = JpaUserDetailsService.getAuthenticatedUserDetails();
    AccountEntity account = accountDataService.getAccountByIdUnsecured(accountId);

    if(!Objects.equals(account.getOwner().getId(), authenticatedUserDetails.getUserId())) throw new UserAccessNotAllowedException();
  }

  public void checkSessionClearance(String sessionId) throws UserAccessNotAllowedException {
    if(userIsAdmin()) return;

    SecurityUserDetails authenticatedUserDetails = JpaUserDetailsService.getAuthenticatedUserDetails();
    List<? extends Session> sessions = sessionRepository.findByPrincipalName(authenticatedUserDetails.getUsername()).values().stream().toList();

    boolean allowed = false;
    for(Session session : sessions) {
      if(session.getId().equals(sessionId)) allowed = true;
    }
    if(!allowed) throw new UserAccessNotAllowedException();
  }

  public void checkUserAdmin() throws UserAccessNotAllowedException {
    if(!userIsAdmin()) throw new UserAccessNotAllowedException();
  }

  private boolean userIsAdmin() {
    return JpaUserDetailsService.getAuthenticatedUserDetails().hasAuthority("ROLE_ADMIN");
  }

}
