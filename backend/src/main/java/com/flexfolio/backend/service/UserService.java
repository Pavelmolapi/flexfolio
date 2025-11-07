package com.flexfolio.backend.service;

import com.flexfolio.backend.model.UserEntity;
import com.flexfolio.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    /**
     * Create a new user
     */
    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    /**
     * Get user by ID
     */
    public Optional<UserEntity> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Get all users
     */
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Update user information
     */
    public UserEntity updateUser(Long id, UserEntity userDetails) {
        return userRepository.findById(id).map(user -> {
            if (userDetails.getEmail() != null) {
                user.setEmail(userDetails.getEmail());
            }
            if (userDetails.getPassword() != null) {
                user.setPassword(userDetails.getPassword());
            }
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    /**
     * Delete user by ID
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
