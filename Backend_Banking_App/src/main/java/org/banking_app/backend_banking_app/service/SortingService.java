package org.banking_app.backend_banking_app.service;

import lombok.NoArgsConstructor;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
public class SortingService {

  public List<AccountHistoryEntity> sortByTimeStamp(List<AccountHistoryEntity> entities) {
    return entities.stream()
            .sorted(Comparator.comparing(AccountHistoryEntity::getTimeStamp).thenComparing((x) -> x.getTimeStamp().getNano()).reversed())
            .toList();
  }
}
