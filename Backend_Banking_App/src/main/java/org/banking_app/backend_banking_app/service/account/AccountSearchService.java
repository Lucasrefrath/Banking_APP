package org.banking_app.backend_banking_app.service.account;

import org.banking_app.backend_banking_app.model.AccountSearchResultModel;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountSearchService {

  @Autowired
  AccountRepository accountRepository;

  public List<AccountSearchResultModel> searchForAccounts(String searchQuery, Long originAccountId) {
    List<AccountEntity> ibanResults = accountRepository.findAllByIbanContainsIgnoreCaseAndActive(searchQuery, true);
    List<AccountEntity> nameResults = accountRepository.findAllByOwner_UsernameContainsIgnoreCaseAndActive(searchQuery, true);

    List<AccountSearchResultModel> resultList = new ArrayList<>();

    for(AccountEntity entity : ibanResults) {
      if(entity.getId().equals(originAccountId)) continue;

      resultList.add(
              new AccountSearchResultModel(
                      entity.getIban(),
                      entity.getOwner().getUsername(),
                      entity.getId()
              )
      );
    }

    for(AccountEntity entity : nameResults) {
      if(entity.getId().equals(originAccountId)) continue;

      resultList.add(
              new AccountSearchResultModel(
                      entity.getIban(),
                      entity.getOwner().getUsername(),
                      entity.getId()
              )
      );
    }

    return resultList;
  }

}
