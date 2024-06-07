package org.banking_app.backend_banking_app.service;

import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
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

  public List<? extends Session> sortSessions(List<? extends Session> sessions) {
    return sessions.stream()
            .sorted(Comparator.comparing(Session::getLastAccessedTime).reversed())
            .toList();
  }

  public static List<String> sortRoles(List<String> roles) {
    List<String> order = Arrays.asList("ROLE_USER", "ROLE_VIP", "ROLE_ADMIN");
    List<String> result = new ArrayList<>();

    for(String role : roles) {
      try {
        result.add(order.indexOf(role), role);
      } catch (IndexOutOfBoundsException e) {
        result.add(role);
      }
    }

    return result;
  }
}
