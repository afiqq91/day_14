package com.example.instructor_api.dto;

import com.example.instructor_api.model.Role;

public class AuthResponse {
    public String token;
    public String tokenType = "Bearer";
    public String email;
    public Role role;
}