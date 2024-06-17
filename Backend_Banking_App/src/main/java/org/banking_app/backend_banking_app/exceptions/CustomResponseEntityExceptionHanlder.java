package org.banking_app.backend_banking_app.exceptions;

import org.banking_app.backend_banking_app.exceptions.customExceptions.NoSuchSignUpRequestFoundException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NoSuchUserFoundException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAlreadyExistsException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAndPasswordDoNotMatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class CustomResponseEntityExceptionHanlder {

  @ExceptionHandler(UsernameAndPasswordDoNotMatchException.class)
  protected ResponseEntity<Object> handleUsername(Exception ex, WebRequest request) {
    ExceptionDetails exceptionDetails = new ExceptionDetails(
            HttpStatus.UNAUTHORIZED,
            ex,
            request
    );
    return new ResponseEntity<>(exceptionDetails, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(NoSuchUserFoundException.class)
  protected ResponseEntity<Object> noSuchUser(Exception ex, WebRequest request) {
    ExceptionDetails exceptionDetails = new ExceptionDetails(
            HttpStatus.UNAUTHORIZED,
            ex,
            request
    );
    return new ResponseEntity<>(exceptionDetails, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(NoSuchSignUpRequestFoundException.class)
  protected ResponseEntity<Object> noSuchReqeust(Exception ex, WebRequest request) {
    ExceptionDetails exceptionDetails = new ExceptionDetails(
            HttpStatus.BAD_REQUEST,
            ex,
            request
    );
    return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(UsernameAlreadyExistsException.class)
  protected ResponseEntity<Object> usernameExists(Exception ex, WebRequest request) {
    ExceptionDetails exceptionDetails = new ExceptionDetails(
            HttpStatus.BAD_REQUEST,
            ex,
            request
    );
    return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
  }
}
