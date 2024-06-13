package org.banking_app.backend_banking_app.service.accountHistory;

import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.banking_app.backend_banking_app.repository.AccountHistoryRepository;
import org.banking_app.backend_banking_app.service.account.AccountDataService;
import org.banking_app.backend_banking_app.service.SortingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountHistoryDataService {

  @Autowired
  private AccountHistoryRepository accountHistoryRepository;

  @Autowired
  AccountDataService accountDataService;

  @Autowired
  SortingService sortingService;

  public List<AccountHistoryEntity> getHistoryForAccount(Long accountId) {
    List<AccountHistoryEntity> destinationHistory = accountHistoryRepository.findAllByDestinationAccountId(accountId);
    List<AccountHistoryEntity> originHistory = accountHistoryRepository.findAllByOriginAccountId(accountId);

    destinationHistory.addAll(originHistory);

    return sortingService.sortByTimeStamp(destinationHistory);
  }

}
