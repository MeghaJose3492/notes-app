import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const notes = [
	{
		id: 1,
		title: 'Ideas for the next project',
		excerpt: 'A few directions worth exploring before the next planning session.',
		updated: 'Today, 9:42 AM',
		category: 'Ideas',
		pinned: true,
	},
	{
		id: 2,
		title: 'Reading list',
		excerpt: 'Books, essays, and references to come back to when there is time.',
		updated: 'Yesterday, 4:18 PM',
		category: 'Personal',
		pinned: false,
	},
	{
		id: 3,
		title: 'Weekly planning notes',
		excerpt: 'Priorities, loose ends, and the small wins from this week.',
		updated: 'Jun 18, 2024',
		category: 'Planning',
		pinned: true,
	},
	{
		id: 4,
		title: 'Grocery list',
		excerpt: 'Fresh fruit, coffee, and the ingredients for Sunday dinner.',
		updated: 'Jun 16, 2024',
		category: 'Personal',
		pinned: false,
	},
	{
		id: 5,
		title: 'Things to learn',
		excerpt: 'Topics and skills to explore over the next few months.',
		updated: 'Jun 12, 2024',
		category: 'Ideas',
		pinned: false,
	},
];

function NoteItem({ note }) {
	return (
		<article className="note-item">
			<div className="note-item-heading">
				<div>
					<p className="note-category">{note.category}</p>
					<h3>{note.title}</h3>
				</div>
				{note.pinned && <span className="pin-mark" aria-label="Pinned note">&#9733;</span>}
			</div>
			<p className="note-excerpt">{note.excerpt}</p>
			<p className="note-updated">Edited {note.updated}</p>
		</article>
	);
}

function Dashboard() {
	const [query, setQuery] = useState('');
	const filteredNotes = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		if (!normalizedQuery) return notes;

		return notes.filter((note) =>
			`${note.title} ${note.excerpt} ${note.category}`.toLowerCase().includes(normalizedQuery),
		);
	}, [query]);

	const recentNotes = filteredNotes.slice(0, 3);
	const pinnedNotes = filteredNotes.filter((note) => note.pinned);

	return (
		<div className="dashboard-page">
			<Nav />
			<main className="dashboard-content">
				<header className="dashboard-heading">
					<div>
						<p className="eyebrow">Your workspace</p>
						<h1>Good morning, there.</h1>
						<p className="dashboard-subtitle">Keep your thoughts close and your next idea closer.</p>
					</div>
					<Link className="dashboard-action" to="/home">View all notes <span aria-hidden="true">&rarr;</span></Link>
				</header>

				<label className="quick-search">
					<span aria-hidden="true">&#8981;</span>
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search your notes"
						aria-label="Search your notes"
					/>
					<kbd>/</kbd>
				</label>

				<section className="dashboard-stats" aria-label="Note summary">
					<div className="stat-card stat-card-featured">
						<p className="stat-label">Total notes</p>
						<strong>{notes.length}</strong>
						<p>Everything you have captured so far</p>
					</div>
					<div className="stat-card">
						<p className="stat-label">Recently edited</p>
						<strong>{recentNotes.length}</strong>
						<p>Notes touched in the last few days</p>
					</div>
					<div className="stat-card">
						<p className="stat-label">Pinned notes</p>
						<strong>{pinnedNotes.length}</strong>
						<p>Quick access to what matters most</p>
					</div>
				</section>

				<div className="dashboard-lists">
					<section className="notes-section">
						<div className="section-heading">
							<div>
								<p className="eyebrow">Your latest thinking</p>
								<h2>Recently edited</h2>
							</div>
							<span className="section-count">{recentNotes.length} notes</span>
						</div>
						<div className="notes-list">
							{recentNotes.length ? recentNotes.map((note) => <NoteItem key={note.id} note={note} />) : <p className="empty-state">No notes match your search.</p>}
						</div>
					</section>

					<section className="notes-section pinned-section">
						<div className="section-heading">
							<div>
								<p className="eyebrow">Saved for later</p>
								<h2>Pinned notes</h2>
							</div>
							<span className="pin-mark" aria-hidden="true">&#9733;</span>
						</div>
						<div className="notes-list">
							{pinnedNotes.length ? pinnedNotes.map((note) => <NoteItem key={note.id} note={note} />) : <p className="empty-state">No pinned notes match your search.</p>}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

export default Dashboard;
