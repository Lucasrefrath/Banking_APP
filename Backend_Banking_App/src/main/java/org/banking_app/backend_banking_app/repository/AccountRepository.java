package org.banking_app.backend_banking_app.repository;

import org.banking_app.backend_banking_app.model.DTO.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {

  List<AccountEntity> findAllByOwner_Id(Long ownerId);

}
