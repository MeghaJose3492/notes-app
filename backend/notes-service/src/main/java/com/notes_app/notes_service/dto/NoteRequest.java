package com.notes_app.notes_service.dto;

import lombok.Data;

@Data
public class NoteRequest {
	private String title;

    private String content;

    private String color;

    private String tags;
}
