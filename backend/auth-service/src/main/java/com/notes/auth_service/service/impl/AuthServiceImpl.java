package com.notes.auth_service.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.notes.auth_service.dto.AuthResponse;
import com.notes.auth_service.dto.LoginRequest;
import com.notes.auth_service.dto.RegisterRequest;
import com.notes.auth_service.entity.User;
import com.notes.auth_service.repository.UserRepository;
import com.notes.auth_service.security.JwtService;
import com.notes.auth_service.service.AuthService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	@Override
	public String register(RegisterRequest request) {
		User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .age(request.getAge())
                .mobile(request.getMobile())
                .interests(String.join(",", request.getInterests()))
                .gender(request.getGender())
                .agreedTerms(request.getAgreedTerms())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
		if(userRepository.existsByEmail(request.getEmail())){
		    return "Email already exists";
		}
        userRepository.save(user);
        return "User Registered Successfully";
	}
	
	@Override
	public AuthResponse login(LoginRequest request) {
		   System.out.println("Step 1: Login method called");

		    User user = userRepository.findByEmail(request.getEmail())
		            .orElseThrow(() -> new RuntimeException("Invalid Email or Password"));

		    System.out.println("Step 2: User found = " + user.getEmail());

		    System.out.println("Entered Password : " + request.getPassword());
		    System.out.println("Stored Password  : " + user.getPassword());

		    boolean matches = passwordEncoder.matches(
		            request.getPassword(),
		            user.getPassword()
		    );

		    System.out.println("Password Matches : " + matches);

		    if (!matches) {
		        throw new RuntimeException("Invalid Email or Password");
		    }

		    System.out.println("Step 3: Generating JWT");

		    String token = jwtService.generateToken(user.getEmail());

		    System.out.println("Step 4: Token Generated");

		    return AuthResponse.builder()
		            .token(token)
		            .build();
	}
}
