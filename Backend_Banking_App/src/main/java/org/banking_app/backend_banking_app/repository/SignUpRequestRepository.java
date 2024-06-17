package org.banking_app.backend_banking_app.repository;

import org.banking_app.backend_banking_app.enums.SignUpRequestStatus;
import org.banking_app.backend_banking_app.model.DTO.SignUpRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SignUpRequestRepository extends JpaRepository<SignUpRequestEntity, Long> {

  Boolean existsByUsernameAndStatus(String username, SignUpRequestStatus status);

  Boolean existsByUsername(String username);

  List<SignUpRequestEntity> findAllByUsernameAndStatus(String username, SignUpRequestStatus status);

  List<SignUpRequestEntity> findAllByStatus(SignUpRequestStatus status);

  List<SignUpRequestEntity> findAllByUsername(String username);

}
