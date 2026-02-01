package com.ecommerce1.sb_ecom1.service;

import com.ecommerce1.sb_ecom1.payload.OrderDTO;
import jakarta.transaction.Transactional;

public interface OrderService {
    @Transactional
    OrderDTO placeOrder(String emailId, Long addressId, String paymentMethod, String pgName, String pgPaymentId, String pgStatus, String pgResponseMessage);
}