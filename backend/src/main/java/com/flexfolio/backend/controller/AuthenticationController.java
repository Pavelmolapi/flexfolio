package com.flexfolio.backend.controller;

import com.flexfolio.backend.dto.LoginRequestDto;
import com.flexfolio.backend.dto.JwtResponseDto;
import com.flexfolio.backend.dto.UserDto;
import com.flexfolio.backend.mapper.EntityMapper;
import com.flexfolio.backend.model.UserEntity;
import com.flexfolio.backend.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication Controller
 * Handles user login, registration, and JWT token management
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private EntityMapper entityMapper;

    /**
     * User login - returns JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> login(@RequestBody LoginRequestDto loginRequest) {
        try {
            JwtResponseDto response = authenticationService.login(loginRequest);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * User registration
     */
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserEntity user) {
        try {
            UserEntity registeredUser = authenticationService.register(user);
            UserDto userDto = entityMapper.toUserDto(registeredUser);
            return new ResponseEntity<>(userDto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Validate token
     */
    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            boolean isValid = authenticationService.validateToken(jwt);
            return new ResponseEntity<>(isValid, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}

