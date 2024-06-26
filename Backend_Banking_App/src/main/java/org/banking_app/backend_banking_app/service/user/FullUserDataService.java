package org.banking_app.backend_banking_app.service.user;

import org.banking_app.backend_banking_app.exceptions.customExceptions.UserAccessNotAllowedException;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.model.DTO.UserModel;
import org.banking_app.backend_banking_app.model.FullUserDataModel;
import org.banking_app.backend_banking_app.service.account.AccountDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FullUserDataService {

  @Autowired
  private UserDataService userDataService;

  @Autowired
  private AccountDataService accountDataService;

  public List<FullUserDataModel> getAllUserData() throws UserAccessNotAllowedException {
    List<FullUserDataModel> returnList = new ArrayList<>();
    List<UserEntity> users = userDataService.getAll();

    for(UserEntity user : users) {
      FullUserDataModel dataModel = new FullUserDataModel();

      dataModel.setUser(new UserModel(user));
      dataModel.setAccounts(accountDataService.getAllByUser(user.getId()));

      returnList.add(dataModel);
    }

    return returnList;
  }

}
