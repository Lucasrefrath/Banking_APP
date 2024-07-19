package org.banking_app.backend_banking_app.service.signUp;

import org.banking_app.backend_banking_app.enums.ApprovalStatus;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NoSuchSignUpRequestFoundException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAlreadyExistsException;
import org.banking_app.backend_banking_app.model.DTO.SignUpRequestEntity;
import org.banking_app.backend_banking_app.model.requestModel.RequestSignUpRequest;
import org.banking_app.backend_banking_app.model.responseModel.UserSignUpIdResponse;
import org.banking_app.backend_banking_app.repository.SignUpRequestRepository;
import org.banking_app.backend_banking_app.service.auth.AuthorisationService;
import org.banking_app.backend_banking_app.service.user.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SignUpDataService {

  @Autowired
  private UserDataService userDataService;

  @Autowired
  private SignUpRequestRepository signUpRequestRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthorisationService authorisationService;

  public void checkExists(String username, String password) throws UsernameAlreadyExistsException {
    if(userDataService.userNameExists(username)) throw new UsernameAlreadyExistsException(username);
    if(signUpRequestRepository.existsByUsernameAndStatus(username, ApprovalStatus.PENDING)) throw new UsernameAlreadyExistsException(username);
    if(signUpRequestRepository.existsByUsername(username)) {
      List<SignUpRequestEntity> allByUsernameAndStatus = signUpRequestRepository.findAllByUsernameAndStatus(username, ApprovalStatus.REJECTED);
      for(SignUpRequestEntity entity : allByUsernameAndStatus) {
        if(passwordEncoder.matches(password, entity.getPassword())) throw new UsernameAlreadyExistsException(username);
      }
    }
  }

  public List<SignUpRequestEntity> getAllOpen() throws UserAccessNotAllowedException {
    authorisationService.checkUserAdmin();
    return signUpRequestRepository.findAllByStatus(ApprovalStatus.PENDING);
  }

  public UserSignUpIdResponse getRequestId(RequestSignUpRequest request) throws NoSuchSignUpRequestFoundException {
    List<SignUpRequestEntity> entities = signUpRequestRepository.findAllByUsername(
            request.getUsername()
    );

    if(entities.isEmpty()) throw new NoSuchSignUpRequestFoundException("User '" + request.getUsername() + "' has no requests.");

    for(SignUpRequestEntity requestEntity : entities) {
      if(passwordEncoder.matches(request.getPassword(), requestEntity.getPassword())) return new UserSignUpIdResponse(requestEntity.getId());
    }

    throw new NoSuchSignUpRequestFoundException();
  }

}
