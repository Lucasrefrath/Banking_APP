package org.banking_app.backend_banking_app;

import org.banking_app.backend_banking_app.exceptions.NoSuchUserFoundException;
import org.banking_app.backend_banking_app.exceptions.UsernameAlreadyExistsException;
import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.service.dataService.AccountService;
import org.banking_app.backend_banking_app.service.dataService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendBankingAppApplication {

  @Autowired
  UserService userService;

  @Autowired
  AccountService accountService;

  @Autowired
  PasswordEncoder encoder;

  public static void main(String[] args) {
    SpringApplication.run(BackendBankingAppApplication.class, args);
  }

  @Bean
  CommandLineRunner commandLineRunner() {
    return args -> {
      try {
        userService.addUser(new UserEntity("admin", encoder.encode("admin"), "ROLE_USER,ROLE_ADMIN"));
        userService.addUser(new UserEntity("user", encoder.encode("user"), "ROLE_USER"));
      } catch (UsernameAlreadyExistsException e) {
        System.out.println("Could not add Users...");
      }
    };
  }

}
