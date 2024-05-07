package org.banking_app.backend_banking_app.service.dataService;


import lombok.Data;
import org.banking_app.backend_banking_app.exceptions.NoSuchUserFoundException;
import org.banking_app.backend_banking_app.exceptions.UsernameAlreadyExistsException;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Data
public class UserService {

  @Autowired
  UserRepository userRepo;

  public UserEntity getUserByUsername(String username) throws NoSuchUserFoundException {
    return userRepo.findByUsername(username).orElseThrow(() -> new NoSuchUserFoundException(username));
  }

  public boolean userNameExists(String username) {
    return userRepo.existsByUsername(username);
  }

  public UserEntity addUser(UserEntity user) throws UsernameAlreadyExistsException {
    if(userNameExists(user.getUsername())) {
      throw new UsernameAlreadyExistsException(user.getUsername());
    }
    return userRepo.save(user);
  }

}
