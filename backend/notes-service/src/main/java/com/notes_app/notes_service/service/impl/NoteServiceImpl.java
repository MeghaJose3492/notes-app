package com.notes_app.notes_service.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.notes_app.notes_service.dto.DashboardResponse;
import com.notes_app.notes_service.dto.NoteRequest;
import com.notes_app.notes_service.entity.Note;
import com.notes_app.notes_service.repository.NoteRepository;
import com.notes_app.notes_service.service.NoteService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {
	private final NoteRepository noteRepository;

	@Override
	public Note createNote(NoteRequest request, String email) {
		Note note = new Note();

        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setColor(request.getColor());
        note.setTags(request.getTags());
        note.setEmail(email);
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());


        return noteRepository.save(note);
	}

	@Override
	public List<Note> getUserNotes(String email) {
		// TODO Auto-generated method stub
		return noteRepository.findByEmail(email);
	}
	
	@Override
	public Note updateNote(Long id, NoteRequest request) {
	    Note note = noteRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Note not found"));
	    note.setTitle(request.getTitle());
	    note.setContent(request.getContent());
	    note.setColor(request.getColor());
	    note.setTags(request.getTags());
	    return noteRepository.save(note);
	}
	
	@Override
	public void deleteNote(Long id) {

	    Note note = noteRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Note not found"));

	    noteRepository.delete(note);
	}
	
	@Override
	public Note toggleStar(Long id) {

	    Note note = noteRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Note not found"));
	    note.setStarred(!note.isStarred());
	    note.setUpdatedAt(LocalDateTime.now());

	    return noteRepository.save(note);
	}
	@Override
	public List<Note> searchNotes(String email, String keyword) {

	    return noteRepository
	            .findByEmailAndTitleContainingIgnoreCase(email, keyword);

	}
	
	@Override
	public DashboardResponse getDashboard(String email) {


	    long totalNotes =
	            noteRepository.countByEmail(email);


	    long starredNotes =
	            noteRepository.countByEmailAndStarredTrue(email);


	    LocalDateTime sevenDaysAgo =
	            LocalDateTime.now().minusDays(7);


	    long recentNotes =
	            noteRepository.countByEmailAndCreatedAtAfter(
	                    email,
	                    sevenDaysAgo
	            );


	    return new DashboardResponse(
	            totalNotes,
	            recentNotes,
	            starredNotes
	    );
	}
}
