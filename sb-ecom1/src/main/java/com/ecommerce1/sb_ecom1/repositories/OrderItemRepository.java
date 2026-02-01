package com.ecommerce1.sb_ecom1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce1.sb_ecom1.model.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}