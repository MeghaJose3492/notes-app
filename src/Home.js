import { useState } from 'react';
import Nav from './Nav';
import { getNotes, saveNotes } from './noteData';

const noteColors = [
  { name: 'Sage', value: '#d6e1b6' },
  { name: 'Sky', value: '#c7dfe2' },
  { name: 'Rose', value: '#ead0c7' },
  { name: 'Gold', value: '#eadcad' },
];

function Home() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState(noteColors[0].value);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [savedNotes, setSavedNotes] = useState(() => getNotes());

  function addTag(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const nextTag = tagInput.trim().replace(/^#/, '');
    if (nextTag && !tags.includes(nextTag)) {
      setTags([...tags, nextTag]);
    }
    setTagInput('');
  }

  function removeTag(tagToRemove) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  function saveNote(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const nextNotes = [
      {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        color,
        tags,
        pinned: false,
        updated: 'Just now',
      },
      ...savedNotes,
    ];
    setSavedNotes(nextNotes);
    saveNotes(nextNotes);
    setTitle('');
    setContent('');
    setColor(noteColors[0].value);
    setTags([]);
    setTagInput('');
  }

  return (
    <div className="notes-page">
      <Nav />
      <main className="notes-content">
        <header className="notes-page-heading">
          <div>
            <p className="eyebrow">Your notebook</p>
            <h1>Create a new note</h1>
            <p>Capture a thought, give it some shape, and keep it close.</p>
          </div>
          <span className="note-count">{savedNotes.length} saved {savedNotes.length === 1 ? 'note' : 'notes'}</span>
        </header>

        <div className="notes-workspace">
          <form className="note-editor" onSubmit={saveNote}>
            <div className="editor-topline">
              <p className="eyebrow">Untitled note</p>
              <span className="editor-status">Draft</span>
            </div>
            <label className="note-title-field" htmlFor="note-title">
              <span className="sr-only">Note title</span>
              <input
                id="note-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Give your note a title"
                required
              />
            </label>
            <label className="note-content-field" htmlFor="note-content">
              <span className="sr-only">Note content</span>
              <textarea
                id="note-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Start writing here..."
                rows="10"
                required
              />
            </label>

            <div className="editor-options">
              <fieldset className="color-picker">
                <legend>Note color</legend>
                <div className="color-options">
                  {noteColors.map((noteColor) => (
                    <label key={noteColor.value} title={noteColor.name}>
                      <input
                        type="radio"
                        name="note-color"
                        value={noteColor.value}
                        checked={color === noteColor.value}
                        onChange={() => setColor(noteColor.value)}
                      />
                      <span className="color-swatch" style={{ backgroundColor: noteColor.value }} />
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="tag-field" htmlFor="note-tags">
                <span>Add tags</span>
                <input
                  id="note-tags"
                  type="text"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={addTag}
                  placeholder="Type a tag and press Enter"
                />
              </label>
            </div>

            {tags.length > 0 && (
              <div className="tag-list" aria-label="Added tags">
                {tags.map((tag) => (
                  <button type="button" className="tag-chip" key={tag} onClick={() => removeTag(tag)}>
                    #{tag} <span aria-hidden="true">x</span>
                  </button>
                ))}
              </div>
            )}

            <div className="editor-actions">
              <button className="btn save-note-button" type="submit">Save note <span aria-hidden="true">&rarr;</span></button>
            </div>
          </form>

          <aside className="saved-notes-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Recently saved</p>
                <h2>Your notes</h2>
              </div>
            </div>
            {savedNotes.length === 0 ? (
              <p className="empty-state">Your saved notes will appear here.</p>
            ) : (
              <div className="saved-notes-list">
                {savedNotes.map((note) => (
                  <article className="saved-note" key={note.id} style={{ borderTopColor: note.color }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    {note.tags.length > 0 && <div className="saved-note-tags">{note.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>}
                  </article>
                ))}
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Home;