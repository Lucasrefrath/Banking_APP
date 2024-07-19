package org.banking_app.backend_banking_app.service.auth;

import jakarta.servlet.http.HttpSession;
import org.banking_app.backend_banking_app.model.DTO.MobileAuthenticationEntity;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.model.SecurityUserDetails;
import org.banking_app.backend_banking_app.repository.MobileAuthenticationRepository;
import org.banking_app.backend_banking_app.service.session.SessionDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MobileAuthenticationService {

  @Autowired
  private MobileAuthenticationRepository mobileAuthenticationRepository;

  @Autowired
  private SessionDataService sessionDataService;

  public boolean verify(UserEntity user, String deviceUUID) {
    Optional<MobileAuthenticationEntity> mobileAuthenticationEntity = mobileAuthenticationRepository.findByUserId(user.getId());
    return mobileAuthenticationEntity.map(authenticationEntity -> authenticationEntity.getDeviceUUID().equals(deviceUUID)).orElse(false);
  }

  public boolean checkMobileAuthentication() {
    HttpSession session = sessionDataService.getCurrentHttpSession();
    return (Boolean) session.getAttribute("2FA_MOBILE_ACCESS");
  }

  public boolean currentUserHasMobileAuthentication() {
    SecurityUserDetails authenticatedUserDetails = JpaUserDetailsService.getAuthenticatedUserDetails();
    return mobileAuthenticationRepository.existsByUserId(authenticatedUserDetails.getUserId());
  }

}
