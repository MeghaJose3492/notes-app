package com.notes_app.notes_service.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="notes")
public class Note {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String title;

    @Column(columnDefinition = "TEXT")
    private String content;


    private String color;

    private String tags;


    private boolean starred = false;


    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    private Long userId;
}
