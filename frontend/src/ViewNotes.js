import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Nav from './Nav';
import Api from "./services/NotesApi";

function NoteCard({ note, onDelete, onEdit, onTogglePin }) {
  return (
    <motion.article
      className="note-card"
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3 }}
      style={{ '--note-color': note.color }}
    >
      <div className="note-card-topline">
        <span className="note-card-date">Edited {note.updated}</span>
        <button
          className={`note-icon-button pin-button ${note.starred ? 'is-pinned' : ''}`}
          type="button"
          onClick={() => onTogglePin(note.id)}
          aria-label={note.starred ? `Unstar ${note.title}` : `Star ${note.title}`}
          title={note.starred ? 'Unstar note' : 'Star note'}
        >
          <span aria-hidden="true">&#9733;</span>
        </button>
      </div>
      <h2>{note.title}</h2>
      <p className="note-card-content">{note.content}</p>
      <div className="note-card-footer">
        <div className="saved-note-tags">
          {note.tags.map((tag) => <span key={tag}>#{tag}</span>)}
        </div>
        <div className="note-card-actions">
          <button className="note-text-button" type="button" onClick={() => onEdit(note)} title="Edit note">Edit</button>
          <button className="note-text-button delete-button" type="button" onClick={() => onDelete(note.id)} title="Delete note">Delete</button>
        </div>
      </div>
    </motion.article>
  );
}

function EditNote({ note, onCancel, onSave }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  function submitEdit(event) {
    event.preventDefault();
    if (title.trim() && content.trim()) {
      onSave({ ...note, title: title.trim(), content: content.trim(), updated: 'Just now' });
    }
  }

  return (
    <motion.form
      className="edit-note-form"
      onSubmit={submitEdit}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <p className="eyebrow">Edit note</p>
      <input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Edit note title" required />
      <textarea value={content} onChange={(event) => setContent(event.target.value)} aria-label="Edit note content" rows="5" required />
      <div className="edit-note-actions">
        <button className="note-text-button" type="button" onClick={onCancel}>Cancel</button>
        <button className="btn save-note-button" type="submit">Save changes</button>
      </div>
    </motion.form>
  );
}

function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState(null);


  const fetchNotes = async () => {
    try {
        const response = await Api.get("/notes");
        setNotes(response.data);
    } catch (error) {
        console.error(error);
    }
  };

useEffect(() => {
    fetchNotes();
}, []);

  const deleteNote = async (id) => {
    try {
        await Api.delete(`/notes/${id}`);
        await fetchNotes();
    } catch (error) {
        console.error(error);
    }
};

const togglePin = async (id) => {
    try {
        await Api.patch(`/notes/${id}/star`);
        await fetchNotes();
    } catch (error) {
        console.error(error);
    }
};

  const updateNote = async (updatedNote) => {
    try {
        await Api.put(`/notes/${updatedNote.id}`, {
            title: updatedNote.title,
            content: updatedNote.content,
            color: updatedNote.color,
            tags: updatedNote.tags
        });
        await fetchNotes();
        setEditingId(null);
    } catch (error) {
        console.error(error);
    }
};

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return notes;
    return notes.filter((note) => `${note.title} ${note.content} ${note.tags.join(' ')}`.toLowerCase().includes(normalizedQuery));
  }, [notes, query]);

  return (
    <div className="notes-page view-notes-page">
      <Nav />
      <main className="notes-content">
        <header className="notes-page-heading">
          <div>
            <p className="eyebrow">Your collection</p>
            <h1>All notes</h1>
            <p>Every idea, list, and loose thread in one place.</p>
          </div>
          <span className="note-count">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
        </header>

        <label className="notes-search">
          <span aria-hidden="true">&#8981;</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search all notes" aria-label="Search all notes" />
        </label>

        <div className="notes-card-grid">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note) => (
              editingId === note.id ? (
                <EditNote key={note.id} note={note} onCancel={() => setEditingId(null)} onSave={updateNote} />
              ) : (
                <NoteCard key={note.id} note={note} onDelete={deleteNote} onEdit={(selectedNote) => setEditingId(selectedNote.id)} onTogglePin={togglePin} />
              )
            ))}
          </AnimatePresence>
        </div>
        {filteredNotes.length === 0 && <p className="empty-state">No notes match your search.</p>}
      </main>
    </div>
  );
}

export default ViewNotes;