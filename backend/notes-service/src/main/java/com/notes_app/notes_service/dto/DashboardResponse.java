package com.notes_app.notes_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {
	private long totalNotes;

    private long recentNotes;

    private long starredNotes;
}
