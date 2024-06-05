package org.banking_app.backend_banking_app.service.user;

import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class UserRoleConvertService {

  public String getString(List<String> roles) {
    StringBuilder finalStringBuilder = new StringBuilder();
    roles.forEach(x -> finalStringBuilder.append(x).append(","));
    if(!finalStringBuilder.isEmpty()) return finalStringBuilder.substring(0, finalStringBuilder.length() -1);
    return "";
  }

  public List<String> getList(String roles) {
    return Arrays.stream(roles.split(",")).toList();
  }

}
