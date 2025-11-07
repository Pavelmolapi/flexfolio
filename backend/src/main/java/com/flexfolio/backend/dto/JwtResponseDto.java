package com.flexfolio.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * JWT Response DTO - sent after successful login
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDto {
    private String accessToken;
    private String tokenType = "Bearer";
    private Long userId;
    private String email;
    private Long expiresIn;

    public JwtResponseDto(String accessToken, Long userId, String email, Long expiresIn) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.email = email;
        this.expiresIn = expiresIn;
    }
}

