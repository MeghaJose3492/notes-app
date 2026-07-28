package com.notes_app.notes_service.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notes_app.notes_service.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUserId(Long userId);
    List<Note> findByUserIdAndTitleContainingIgnoreCase(
            Long userId,
            String title
    );
    long countByUserId(Long userId);

    long countByUserIdAndStarredTrue(Long userId);

    long countByUserIdAndCreatedAtAfter(Long userId, LocalDateTime date);
}
