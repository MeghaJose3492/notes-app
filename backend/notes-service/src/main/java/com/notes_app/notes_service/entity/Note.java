package com.notes_app.notes_service.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
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

    @ElementCollection
    private List<String> tags;

    private boolean pinned;
    private boolean starred = false;


    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    private String email;
}
