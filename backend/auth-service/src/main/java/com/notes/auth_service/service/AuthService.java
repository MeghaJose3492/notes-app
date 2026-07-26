package com.notes.auth_service.service;

import com.notes.auth_service.dto.AuthResponse;
import com.notes.auth_service.dto.LoginRequest;
import com.notes.auth_service.dto.RegisterRequest;

public interface AuthService {
	String register(RegisterRequest request);
	
	AuthResponse login(LoginRequest request);
}
