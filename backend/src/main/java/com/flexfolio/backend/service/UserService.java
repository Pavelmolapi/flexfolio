package com.flexfolio.backend.service;

import com.flexfolio.backend.dto.UserDto;
import com.flexfolio.backend.mapper.EntityMapper;
import com.flexfolio.backend.model.UserEntity;
import com.flexfolio.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final EntityMapper entityMapper;

    /**
     * Create a new user
     */
    @Transactional
    public UserDto createUser(UserEntity user) {
        UserEntity savedUser = userRepository.save(user);
        return entityMapper.toUserDto(savedUser);
    }

    /**
     * Get user by ID
     */
    @Transactional
    public Optional<UserDto> getUserById(Long id) {
        return userRepository.findById(id)
            .map(entityMapper::toUserDto);
    }

    /**
     * Get all users
     */
    @Transactional
    public List<UserDto> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return entityMapper.toUserDtoList(users);
    }

    /**
     * Update user information
     */
    @Transactional
    public UserDto updateUser(Long id, UserEntity userDetails) {
        UserEntity updatedUser = userRepository.findById(id).map(user -> {
            if (userDetails.getEmail() != null) {
                user.setEmail(userDetails.getEmail());
            }
            if (userDetails.getPassword() != null) {
                user.setPassword(userDetails.getPassword());
            }
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        return entityMapper.toUserDto(updatedUser);
    }

    /**
     * Delete user by ID
     */
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
