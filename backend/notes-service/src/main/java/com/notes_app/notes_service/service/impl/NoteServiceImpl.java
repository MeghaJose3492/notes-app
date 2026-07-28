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
	public Note createNote(NoteRequest request, Long userId) {
		Note note = new Note();

        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setColor(request.getColor());
        note.setTags(request.getTags());
        note.setUserId(userId);
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());


        return noteRepository.save(note);
	}

	@Override
	public List<Note> getUserNotes(Long userId) {
		// TODO Auto-generated method stub
		return noteRepository.findByUserId(userId);
	}
	
	@Override
	public Note updateNote(Long id, NoteRequest request) {

	    Note note = noteRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Note not found"));


	    note.setTitle(request.getTitle());
	    note.setContent(request.getContent());
	    note.setColor(request.getColor());
	    note.setTags(request.getTags());

	    note.setUpdatedAt(LocalDateTime.now());


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
	public List<Note> searchNotes(Long userId, String keyword) {

	    return noteRepository
	            .findByUserIdAndTitleContainingIgnoreCase(userId, keyword);

	}
	
	@Override
	public DashboardResponse getDashboard(Long userId) {


	    long totalNotes =
	            noteRepository.countByUserId(userId);


	    long starredNotes =
	            noteRepository.countByUserIdAndStarredTrue(userId);


	    LocalDateTime sevenDaysAgo =
	            LocalDateTime.now().minusDays(7);


	    long recentNotes =
	            noteRepository.countByUserIdAndCreatedAtAfter(
	                    userId,
	                    sevenDaysAgo
	            );


	    return new DashboardResponse(
	            totalNotes,
	            recentNotes,
	            starredNotes
	    );
	}
}
