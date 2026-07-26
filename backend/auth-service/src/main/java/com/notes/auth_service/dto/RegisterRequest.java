package com.notes.auth_service.dto;

import java.util.List;

import com.notes.auth_service.entity.Gender;

import lombok.Data;

@Data
public class RegisterRequest {

	private String fullName;
    private String email;
    private String password;
    private Integer age;
    private String mobile;
    private Gender gender;
    private List<String> interests;
    private Boolean agreedTerms;

}
