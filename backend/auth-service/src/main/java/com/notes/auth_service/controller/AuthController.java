package com.notes.auth_service.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.auth_service.dto.AuthResponse;
import com.notes.auth_service.dto.LoginRequest;
import com.notes.auth_service.dto.RegisterRequest;
import com.notes.auth_service.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthService authService;

	
	@PostMapping("/register")
	public String register(@RequestBody RegisterRequest request) {
		return authService.register(request);
	}
	
	@PostMapping("/login")
	public AuthResponse login(@RequestBody LoginRequest request) {
		System.out.println("Inside Login Controller");
	    return authService.login(request);
	}
}
