package org.banking_app.backend_banking_app.repository;

import org.banking_app.backend_banking_app.enums.SignUpRequestStatus;
import org.banking_app.backend_banking_app.model.DTO.SignUpRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SignUpRequestRepository extends JpaRepository<SignUpRequestEntity, Long> {

  Boolean existsByUsername(String username);

  List<SignUpRequestEntity> findAllByStatus(SignUpRequestStatus status);

  Optional<SignUpRequestEntity> findByUsername(String username);

}
