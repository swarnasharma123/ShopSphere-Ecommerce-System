package com.ecommerce1.sb_ecom1.repositories;

import com.ecommerce1.sb_ecom1.model.AppRole;
import com.ecommerce1.sb_ecom1.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(AppRole appRole);
}