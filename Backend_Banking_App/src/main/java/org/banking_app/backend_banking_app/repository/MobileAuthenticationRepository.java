package org.banking_app.backend_banking_app.repository;

import org.banking_app.backend_banking_app.model.DTO.MobileAuthenticationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MobileAuthenticationRepository extends JpaRepository<MobileAuthenticationEntity, Long> {

  Boolean existsByUserId(Long userId);

  Optional<MobileAuthenticationEntity> findByUserId(Long userId);
}
