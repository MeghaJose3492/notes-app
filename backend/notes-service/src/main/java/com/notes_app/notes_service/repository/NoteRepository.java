package com.notes_app.notes_service.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notes_app.notes_service.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByEmail(Long userId);
    List<Note> findByEmailAndTitleContainingIgnoreCase(
    		String email,
            String title
    );
    long countByEmail(String email);
    
    List<Note> findByEmail(String email);

    long countByEmailAndStarredTrue(String email);

    long countByEmailAndCreatedAtAfter(String email, LocalDateTime date);
}
