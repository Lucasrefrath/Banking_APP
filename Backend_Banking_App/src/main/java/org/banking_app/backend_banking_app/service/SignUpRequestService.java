package org.banking_app.backend_banking_app.service;

import org.banking_app.backend_banking_app.enums.SignUpRequestStatus;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAlreadyExistsException;
import org.banking_app.backend_banking_app.model.DTO.SignUpRequestEntity;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.model.requestModel.ApproveRequestRequest;
import org.banking_app.backend_banking_app.model.requestModel.RejectRequestRequest;
import org.banking_app.backend_banking_app.model.requestModel.RequestSignUpRequest;
import org.banking_app.backend_banking_app.model.responseModel.UserSignUpIdResponse;
import org.banking_app.backend_banking_app.repository.SignUpRequestRepository;
import org.banking_app.backend_banking_app.service.auth.AuthorisationService;
import org.banking_app.backend_banking_app.service.user.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SignUpRequestService {

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  SignUpRequestRepository signUpRequestRepository;

  @Autowired
  UserDataService userDataService;
  @Autowired
  private AuthorisationService authorisationService;

  public SignUpRequestEntity requestSignUp(RequestSignUpRequest request) throws UsernameAlreadyExistsException {
    checkExists(request.getUsername());
    SignUpRequestEntity entity = new SignUpRequestEntity(
            request.getUsername(),
            passwordEncoder.encode(request.getPassword())
    );
    entity.setCreatedAt(LocalDateTime.now());
    signUpRequestRepository.save(entity);
    return entity;
  }

  public UserSignUpIdResponse getRequestId(RequestSignUpRequest request) {
    SignUpRequestEntity entity = signUpRequestRepository.findByUsername(
            request.getUsername()
    ).orElse(new SignUpRequestEntity());

    return new UserSignUpIdResponse(entity.getId());
  }

  public SignUpRequestEntity checkStatus(Long requestId) {
    return signUpRequestRepository.findById(requestId).orElseThrow(() -> new UsernameNotFoundException(requestId.toString()));
  }

  private void checkExists(String username) throws UsernameAlreadyExistsException {
    if(signUpRequestRepository.existsByUsername(username) || userDataService.userNameExists(username)) throw new UsernameAlreadyExistsException(username);
  }

  public List<SignUpRequestEntity> getAllOpen() throws UserAccessNotAllowedException {
    authorisationService.checkUserAdmin();
    return signUpRequestRepository.findAllByStatus(SignUpRequestStatus.PENDING);
  }

  public void reject(RejectRequestRequest request) {
    SignUpRequestEntity entity = checkStatus(request.getRequestId());
    entity.setStatus(SignUpRequestStatus.REJECTED);
    entity.setRejectionMessage(request.getReason());
    entity.setProcessedAt(LocalDateTime.now());
    signUpRequestRepository.save(entity);
  }

  public void approve(ApproveRequestRequest request) throws UsernameAlreadyExistsException {
    SignUpRequestEntity entity = checkStatus(request.getRequestId());
    entity.setStatus(SignUpRequestStatus.APPROVED);
    entity.setProcessedAt(LocalDateTime.now());
    signUpRequestRepository.save(entity);
    userDataService.addUser(new UserEntity(
            entity.getUsername(),
            entity.getPassword(),
            "ROLE_USER"
    ));
  }

}
