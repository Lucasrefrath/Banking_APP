package org.banking_app.backend_banking_app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.springframework.session.Session;
import java.util.List;

@Data
@AllArgsConstructor
public class UserSessionsOverview {

  private UserEntity user;

  private List<? extends Session> sessions;

}
