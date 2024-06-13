package org.banking_app.backend_banking_app.service.user;


import lombok.Data;
import org.banking_app.backend_banking_app.exceptions.customExceptions.NoSuchUserFoundException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAlreadyExistsException;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.repository.UserRepository;
import org.banking_app.backend_banking_app.service.SortingService;
import org.banking_app.backend_banking_app.service.auth.AuthorisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Data
public class UserDataService {

  @Autowired
  UserRepository userRepo;

  @Autowired
  AuthorisationService authorisationService;

  @Autowired
  UserRoleConvertService userRoleConvertService;

  @Autowired
  SortingService sortingService;

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

  public List<UserEntity> getAll() throws UserAccessNotAllowedException {
    authorisationService.checkUserAdmin();
    List<UserEntity> users = userRepo.findAll();
    return sortingService.sortUserById(users);
  }

  public void updateUserRoles(Long userId, ArrayList<String> updatedRoles) throws UserAccessNotAllowedException {
    authorisationService.checkUserAdmin();
    UserEntity userEntity = userRepo.findById(userId).orElseThrow(() -> new UsernameNotFoundException(userId.toString()));
    userEntity.setRoles(userRoleConvertService.getString(updatedRoles));
    userRepo.save(userEntity);
  }

}
