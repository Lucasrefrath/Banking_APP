package org.banking_app.backend_banking_app.repository;

import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.banking_app.backend_banking_app.model.DTO.AccountHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountHistoryRepository extends JpaRepository<AccountHistoryEntity, Long> {

  List<AccountHistoryEntity> findAllByOriginAccountId(Long originAccountId);

  List<AccountHistoryEntity> findAllByDestinationAccountId(Long destinationAccountId);
}
