package org.banking_app.backend_banking_app.service.dataService;

import lombok.Data;
import org.banking_app.backend_banking_app.exceptions.IdNotNullException;
import org.banking_app.backend_banking_app.exceptions.NoSuchUserFoundException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Data
public class AccountService {

  @Autowired
  AccountRepository accountRepository;

  @Autowired
  UserService userService;

  public AccountEntity createAccount(AccountEntity entity) throws IdNotNullException {
    if(entity.getId() != null) throw new IdNotNullException(entity.getId());
    return accountRepository.save(entity);
  }

  public AccountEntity createAccount(AccountEntity entity, String ownerName) throws NoSuchUserFoundException, IdNotNullException {
    entity.setOwner(userService.getUserByUsername(ownerName));
    return createAccount(entity);
  }

}
