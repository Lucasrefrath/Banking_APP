package org.banking_app.backend_banking_app.service;

import org.banking_app.backend_banking_app.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class IBANIssuerService {

  @Autowired
  AccountRepository accountRepository;

  private final String BLZ = "DE69";

  private final Random random = new Random();

  public String createIBAN() {
    String IBAN;
    do {
      IBAN = issueNewIBAN();
    } while (accountRepository.existsByIban(IBAN));

    return IBAN;
  }

  private String issueNewIBAN() {
    return BLZ + " " + getNextFour() + " " + getNextFour() + " " + getNextFour() + " " + getNextFour() + " " + getLastTwo();
  }

  private String getNextFour() {
    return random.nextInt(9) + "" + random.nextInt(9) + "" + random.nextInt(9) + "" + random.nextInt(9);
  }

  private String getLastTwo() {
    return random.nextInt(9) + "" + random.nextInt(9);
  }

}
