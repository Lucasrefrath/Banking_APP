package org.banking_app.backend_banking_app.service;

import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@NoArgsConstructor
public class SortingService {

  public List<AccountHistoryEntity> sortByTimeStamp(List<AccountHistoryEntity> entities) {
    return entities.stream()
            .sorted(Comparator.comparing(AccountHistoryEntity::getTimeStamp).thenComparing((x) -> x.getTimeStamp().getNano()).reversed())
            .toList();
  }

  public List<AccountEntity> sortAccountsById(List<AccountEntity> accounts) {
    return accounts.stream()
            .sorted(Comparator.comparing(AccountEntity::getId))
            .toList();
  }

  public List<UserEntity> sortUserById(List<UserEntity> user) {
    return user.stream()
            .sorted(Comparator.comparing(UserEntity::getId))
            .toList();
  }

  public String sortRoles(String roles) {
    //TODO: IMPLEMENT
    return "sorted Roles";
  }
}
