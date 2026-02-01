package com.ecommerce1.sb_ecom1.service;

import com.ecommerce1.sb_ecom1.exceptions.APIException;
import com.ecommerce1.sb_ecom1.model.PasswordResetToken;
import com.ecommerce1.sb_ecom1.model.User;
import com.ecommerce1.sb_ecom1.repositories.PasswordResetTokenRepository;
import com.ecommerce1.sb_ecom1.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class PasswordResetService {
    private final PasswordResetTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("${app.otp.expiration-minutes:10}")
    private int otpExpirationMinutes;

    @Value("${app.otp.cooldown-seconds:60}")
    private int otpCooldownSeconds;

    @Value("${spring.mail.username:no-reply@example.com}")
    private String mailFrom;

    public PasswordResetService(PasswordResetTokenRepository tokenRepository,
                                UserRepository userRepository,
                                PasswordEncoder passwordEncoder,
                                JavaMailSender mailSender) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    @Transactional
    public void requestPasswordReset(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new APIException("Email is not registered.");
        }
        if (!userOptional.get().isEmailVerified()) {
            throw new APIException("Email is not verified.");
        }

        tokenRepository.findFirstByEmailOrderByCreatedAtDesc(email).ifPresent(latest -> {
            if (latest.getCreatedAt().isAfter(LocalDateTime.now().minusSeconds(otpCooldownSeconds))) {
                throw new APIException("Please wait before requesting another OTP.");
            }
        });

        List<PasswordResetToken> activeTokens = tokenRepository.findByEmailAndUsedFalse(email);
        for (PasswordResetToken token : activeTokens) {
            token.setUsed(true);
        }
        tokenRepository.saveAll(activeTokens);

        String otp = generateOtp();
        PasswordResetToken token = new PasswordResetToken();
        token.setEmail(email);
        token.setOtpHash(passwordEncoder.encode(otp));
        token.setExpiresAt(LocalDateTime.now().plusMinutes(otpExpirationMinutes));
        tokenRepository.save(token);

        sendOtpEmail(email, otp);
    }

    @Transactional
    public void verifyOtp(String email, String otp) {
        PasswordResetToken token = getLatestToken(email);
        if (token.isUsed() || token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new APIException("OTP expired. Please request a new one.");
        }
        if (!passwordEncoder.matches(otp, token.getOtpHash())) {
            throw new APIException("Invalid OTP.");
        }
        token.setVerified(true);
        tokenRepository.save(token);
    }

    @Transactional
    public void resetPassword(String email, String otp, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new APIException("User not found."));

        PasswordResetToken token = getLatestToken(email);
        if (token.isUsed() || token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new APIException("OTP expired. Please request a new one.");
        }
        if (!passwordEncoder.matches(otp, token.getOtpHash())) {
            throw new APIException("Invalid OTP.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        token.setUsed(true);
        token.setVerified(true);
        tokenRepository.save(token);
    }

    private PasswordResetToken getLatestToken(String email) {
        return tokenRepository.findFirstByEmailOrderByCreatedAtDesc(email)
                .orElseThrow(() -> new APIException("OTP not found. Please request a new one."));
    }

    private String generateOtp() {
        int number = 100000 + new Random().nextInt(900000);
        return String.valueOf(number);
    }

    private void sendOtpEmail(String email, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Password reset OTP");
            message.setText("Your OTP for password reset is: " + otp +
                    "\nIt is valid for " + otpExpirationMinutes + " minutes.");
            message.setFrom(mailFrom);
            mailSender.send(message);
        } catch (Exception ex) {
            throw new APIException("Unable to send OTP email. Please check mail settings.");
        }
    }
}
