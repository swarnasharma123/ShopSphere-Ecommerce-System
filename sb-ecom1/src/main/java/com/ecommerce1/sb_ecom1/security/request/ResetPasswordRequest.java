package com.ecommerce1.sb_ecom1.security.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 4, max = 8)
    private String otp;

    @NotBlank
    @Size(min = 6, max = 120)
    private String newPassword;
}
