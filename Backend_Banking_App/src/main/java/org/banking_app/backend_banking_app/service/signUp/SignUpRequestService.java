package org.banking_app.backend_banking_app.service.signUp;

import org.banking_app.backend_banking_app.enums.ApprovalStatus;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAlreadyExistsException;
import org.banking_app.backend_banking_app.model.DTO.SignUpRequestEntity;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.model.requestModel.ApproveRequestRequest;
import org.banking_app.backend_banking_app.model.requestModel.RejectRequestRequest;
import org.banking_app.backend_banking_app.model.requestModel.RequestSignUpRequest;
import org.banking_app.backend_banking_app.repository.SignUpRequestRepository;
import org.banking_app.backend_banking_app.service.user.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SignUpRequestService {

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private SignUpRequestRepository signUpRequestRepository;

  @Autowired
  private UserDataService userDataService;

  @Autowired
  private SignUpDataService signUpDataService;

  public SignUpRequestEntity requestSignUp(RequestSignUpRequest request) throws UsernameAlreadyExistsException {
    signUpDataService.checkExists(
            request.getUsername(),
            request.getPassword()
            );

    SignUpRequestEntity entity = new SignUpRequestEntity(
            request.getUsername(),
            passwordEncoder.encode(request.getPassword())
    );
    entity.setCreatedAt(LocalDateTime.now());
    signUpRequestRepository.save(entity);
    return entity;
  }

  public SignUpRequestEntity checkStatus(Long requestId) {
    return signUpRequestRepository.findById(requestId).orElseThrow(() -> new UsernameNotFoundException(requestId.toString()));
  }

  public void reject(RejectRequestRequest request) {
    SignUpRequestEntity entity = checkStatus(request.getRequestId());
    entity.setStatus(ApprovalStatus.REJECTED);
    entity.setRejectionMessage(request.getReason());
    entity.setProcessedAt(LocalDateTime.now());
    signUpRequestRepository.save(entity);
  }

  public void approve(ApproveRequestRequest request) throws UsernameAlreadyExistsException {
    SignUpRequestEntity entity = checkStatus(request.getRequestId());
    entity.setStatus(ApprovalStatus.APPROVED);
    entity.setProcessedAt(LocalDateTime.now());
    signUpRequestRepository.save(entity);
    userDataService.addUser(new UserEntity(
            entity.getUsername(),
            entity.getPassword(),
            "ROLE_USER"
    ));
  }

}
