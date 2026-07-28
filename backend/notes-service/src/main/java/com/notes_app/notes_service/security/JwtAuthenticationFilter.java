package com.notes_app.notes_service.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter  extends OncePerRequestFilter{


	private final JwtService jwtService;


	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization");// TODO Auto-generated method stub
		if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
		String token = authHeader.substring(7);

		String email = jwtService.extractEmail(token);
		Long userId = jwtService.extractUserId(token);


        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {


        	if (jwtService.isValidToken(token)) {

        	    UsernamePasswordAuthenticationToken authentication =
        	            new UsernamePasswordAuthenticationToken(
        	                    email,
        	                    null,
        	                    Collections.emptyList()
        	            );

        	    authentication.setDetails(userId);

        	    SecurityContextHolder
        	            .getContext()
        	            .setAuthentication(authentication);
        	}
        }


        filterChain.doFilter(request, response);
    }
}
