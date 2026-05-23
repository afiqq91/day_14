package com.example.instructor_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.instructor_api.dto.LoginResponse;
import com.example.instructor_api.dto.RegisterRequest;
import com.example.instructor_api.model.User;
import com.example.instructor_api.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(
        @RequestBody RegisterRequest request
) {

    if (
    request.email.equals("admin@admin.com")
    &&
    request.password.equals("pwd12345")
) {

return new LoginResponse(
    "fake-jwt-token", 
    request.email, 
    "ADMIN");
}


    throw new RuntimeException("Invalid email or password");

}

}