package com.ecommerce1.sb_ecom1.repositories;

import com.ecommerce1.sb_ecom1.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findFirstByEmailOrderByCreatedAtDesc(String email);

    List<PasswordResetToken> findByEmailAndUsedFalse(String email);
}
