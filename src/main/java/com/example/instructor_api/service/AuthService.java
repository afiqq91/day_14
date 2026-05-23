package com.example.instructor_api.service;

import com.example.instructor_api.dto.RegisterRequest;
import com.example.instructor_api.model.Role;
import com.example.instructor_api.model.User;
import com.example.instructor_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User register(RegisterRequest request) {
        // 1. Check for duplicate email
        if (userRepository.findByEmail(request.email).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        
        // 2. Hash password (we just "scramble" it for this exercise)
        user.setPassword("encoded_" + request.password);
        
        // 3. Assign default role as USER
        user.setRole(Role.USER);

        return userRepository.save(user);
    }
}