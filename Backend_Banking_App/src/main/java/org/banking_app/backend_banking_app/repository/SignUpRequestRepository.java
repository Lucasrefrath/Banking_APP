package org.banking_app.backend_banking_app.repository;

import org.banking_app.backend_banking_app.enums.ApprovalStatus;
import org.banking_app.backend_banking_app.model.DTO.SignUpRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignUpRequestRepository extends JpaRepository<SignUpRequestEntity, Long> {

  Boolean existsByUsernameAndStatus(String username, ApprovalStatus status);

  Boolean existsByUsername(String username);

  List<SignUpRequestEntity> findAllByUsernameAndStatus(String username, ApprovalStatus status);

  List<SignUpRequestEntity> findAllByStatus(ApprovalStatus status);

  List<SignUpRequestEntity> findAllByUsername(String username);

}
