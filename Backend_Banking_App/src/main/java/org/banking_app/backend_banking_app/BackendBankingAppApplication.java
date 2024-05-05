package org.banking_app.backend_banking_app;

import org.banking_app.backend_banking_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendBankingAppApplication {

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder encoder;

  public static void main(String[] args) {
    SpringApplication.run(BackendBankingAppApplication.class, args);
  }

  @Bean
  CommandLineRunner commandLineRunner() {
    return args -> {
      //userRepository.save(new UserEntity("admin", encoder.encode("admin"), "ROLE_ADMIN"));
    };
  }

}
