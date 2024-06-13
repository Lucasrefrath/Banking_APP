package org.banking_app.backend_banking_app.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ExceptionDetails {

  private LocalDateTime timestamp;

  private int status;

  private String error;

  private String message;

  private String exceptionName;

  private String path;

  public ExceptionDetails(HttpStatus status, Exception exception, WebRequest request) {
    this.timestamp = LocalDateTime.now();
    this.status = status.value();
    this.exceptionName = exception.getClass().getSimpleName();
    this.error = status.getReasonPhrase();
    this.message = exception.getMessage();
    this.path = request.getDescription(false).substring(4);
  }

}
