package org.banking_app.backend_banking_app.controller;

import jakarta.websocket.server.PathParam;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NoSuchSignUpRequestFoundException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAlreadyExistsException;
import org.banking_app.backend_banking_app.model.requestModel.ApproveRequestRequest;
import org.banking_app.backend_banking_app.model.requestModel.RejectRequestRequest;
import org.banking_app.backend_banking_app.model.requestModel.RequestSignUpRequest;
import org.banking_app.backend_banking_app.service.signUp.SignUpDataService;
import org.banking_app.backend_banking_app.service.signUp.SignUpRequestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/userSignUp")
@CrossOrigin(value = "http://localhost:3000/", allowCredentials = "true", exposedHeaders = "Set-Cookie")
public class UserSignUpController {

  @Autowired
  private SignUpRequestService signUpRequestService;

  @Autowired
  private SignUpDataService signUpDataService;

  @PostMapping("/request")
  public ResponseEntity requestSignUp(@RequestBody RequestSignUpRequest request) throws UsernameAlreadyExistsException {
    return ResponseEntity.ok(signUpRequestService.requestSignUp(request));
  }

  @PostMapping("/getId")
  public ResponseEntity getRequestId(@RequestBody RequestSignUpRequest request) throws NoSuchSignUpRequestFoundException {
    return ResponseEntity.ok(signUpDataService.getRequestId(request));
  }

  @GetMapping("/checkStatus")
  public ResponseEntity checkStatus(@PathParam("id") Long id) {
    return ResponseEntity.ok(signUpRequestService.checkStatus(id));
  }

  @GetMapping("/open")
  public ResponseEntity getOpenRequests() throws UserAccessNotAllowedException {
    return ResponseEntity.ok(signUpDataService.getAllOpen());
  }

  @PostMapping("/reject")
  public ResponseEntity rejectRequest(@RequestBody RejectRequestRequest request) {
    signUpRequestService.reject(request);
    return ResponseEntity.ok(request.getRequestId() + " rejected");
  }

  @PostMapping("/approve")
  public ResponseEntity approveRequest(@RequestBody ApproveRequestRequest request) throws UsernameAlreadyExistsException {
    signUpRequestService.approve(request);
    return ResponseEntity.ok(request.getRequestId() + " approved");
  }
}
