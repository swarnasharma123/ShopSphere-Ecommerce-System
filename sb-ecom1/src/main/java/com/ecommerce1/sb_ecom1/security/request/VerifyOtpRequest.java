package com.ecommerce1.sb_ecom1.security.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class VerifyOtpRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 4, max = 8)
    private String otp;
}
