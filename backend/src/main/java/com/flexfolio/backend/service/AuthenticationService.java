package com.flexfolio.backend.service;

import com.flexfolio.backend.dto.LoginRequestDto;
import com.flexfolio.backend.dto.JwtResponseDto;
import com.flexfolio.backend.model.UserEntity;
import com.flexfolio.backend.repository.UserRepository;
import com.flexfolio.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Authentication Service
 * Handles user login and JWT token generation
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final JwtTokenProvider tokenProvider;

    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.expiration:86400000}")
    private long jwtExpirationMs;

    /**
     * Authenticate user and generate JWT token
     */
    public JwtResponseDto login(LoginRequestDto loginRequest) throws AuthenticationException {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        // Generate JWT token
        String jwt = tokenProvider.generateToken(authentication.getName());

        // Get user details
        UserEntity user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Calculate expiration time in seconds
        long expiresIn = jwtExpirationMs / 1000;

        return new JwtResponseDto(jwt, user.getId(), user.getEmail(), expiresIn);
    }

    /**
     * Register new user
     */
    public UserEntity register(UserEntity user) {
        // Check if user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user
        return userRepository.save(user);
    }

    /**
     * Validate JWT token
     */
    public boolean validateToken(String token) {
        return tokenProvider.validateToken(token);
    }

    /**
     * Get username from JWT token
     */
    public String getUsernameFromToken(String token) {
        return tokenProvider.getUsernameFromToken(token);
    }
}

