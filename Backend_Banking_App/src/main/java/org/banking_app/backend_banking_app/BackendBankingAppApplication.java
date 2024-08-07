package org.banking_app.backend_banking_app;

import org.banking_app.backend_banking_app.exceptions.customExceptions.UsernameAlreadyExistsException;
import org.banking_app.backend_banking_app.model.DTO.MobileAuthenticationEntity;
import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.banking_app.backend_banking_app.repository.MobileAuthenticationRepository;
import org.banking_app.backend_banking_app.service.account.AccountDataService;
import org.banking_app.backend_banking_app.service.user.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendBankingAppApplication {

  @Autowired
  UserDataService userDataService;

  @Autowired
  AccountDataService accountDataService;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  MobileAuthenticationRepository mobileAuthenticationRepository;

  public static void main(String[] args) {
    SpringApplication.run(BackendBankingAppApplication.class, args);
  }

  @Bean
  CommandLineRunner commandLineRunner() {
    return args -> {

      try {
        userDataService.addUser(new UserEntity("admin", encoder.encode("admin"), "ROLE_USER,ROLE_ADMIN"));
        userDataService.addUser(new UserEntity("user", encoder.encode("user"), "ROLE_USER"));
      } catch (UsernameAlreadyExistsException e) {
        System.out.println("Could not add Users...");
      }
    };
  }

}
