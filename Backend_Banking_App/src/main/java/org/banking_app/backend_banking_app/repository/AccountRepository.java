package org.banking_app.backend_banking_app.repository;

import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
}
