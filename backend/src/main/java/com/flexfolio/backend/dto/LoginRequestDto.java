package com.flexfolio.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Login request DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDto {
    private String email;
    private String password;
}

