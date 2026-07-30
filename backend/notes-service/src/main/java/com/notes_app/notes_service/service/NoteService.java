package com.notes_app.notes_service.service;

import java.util.List;

import com.notes_app.notes_service.dto.DashboardResponse;
import com.notes_app.notes_service.dto.NoteRequest;
import com.notes_app.notes_service.entity.Note;

public interface NoteService {
	Note createNote(NoteRequest request, String email);

    List<Note> getUserNotes(String email);
    Note updateNote(Long id, NoteRequest request);
    void deleteNote(Long id);
    Note toggleStar(Long id);
    List<Note> searchNotes(String email, String keyword);
    DashboardResponse getDashboard(String email);
}
