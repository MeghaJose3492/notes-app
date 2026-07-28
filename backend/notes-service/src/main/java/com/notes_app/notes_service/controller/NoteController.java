package com.notes_app.notes_service.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.notes_app.notes_service.dto.DashboardResponse;
import com.notes_app.notes_service.dto.NoteRequest;
import com.notes_app.notes_service.entity.Note;
import com.notes_app.notes_service.service.NoteService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {
	 private final NoteService noteService;


	    @PostMapping
	    public ResponseEntity<Note> createNote(
	            @RequestBody NoteRequest request) {


	    	Authentication authentication =
	    	        SecurityContextHolder.getContext().getAuthentication();

	    	Long userId = (Long) authentication.getDetails();
	        Note note = noteService.createNote(request, userId);

	        return ResponseEntity.ok(note);
	    }



	    @GetMapping
	    public ResponseEntity<List<Note>> getNotes() {


	    	Authentication authentication =
	    	        SecurityContextHolder.getContext().getAuthentication();

	    	Long userId = (Long) authentication.getDetails();

	        List<Note> notes = noteService.getUserNotes(userId);

	        return ResponseEntity.ok(notes);
	    }
	    
	    @PutMapping("/{id}")
	    public ResponseEntity<Note> updateNote(
	            @PathVariable Long id,
	            @RequestBody NoteRequest request) {
	        Note updatedNote = noteService.updateNote(id, request);
	        return ResponseEntity.ok(updatedNote);
	    }
	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteNote(
	            @PathVariable Long id) {
	        noteService.deleteNote(id);
	        return ResponseEntity.ok("Note deleted successfully");
	    }
	    
	    @PatchMapping("/{id}/star")
	    public ResponseEntity<Note> toggleStar(
	            @PathVariable Long id) {
	        Note note = noteService.toggleStar(id);
	        return ResponseEntity.ok(note);
	    }

	    @GetMapping("/search")
	    public ResponseEntity<List<Note>> searchNotes(
	            @RequestParam String keyword) {
	    	Authentication authentication =
	    	        SecurityContextHolder.getContext().getAuthentication();

	    	Long userId = (Long) authentication.getDetails();
	        List<Note> notes =
	                noteService.searchNotes(userId, keyword);
	        return ResponseEntity.ok(notes);
	    }
	    
	    @GetMapping("/dashboard")
	    public ResponseEntity<DashboardResponse> dashboard() {
	    	Authentication authentication =
	    	        SecurityContextHolder.getContext().getAuthentication();

	    	Long userId = (Long) authentication.getDetails();
	        return ResponseEntity.ok(
	                noteService.getDashboard(userId)
	        );
	    }
}
