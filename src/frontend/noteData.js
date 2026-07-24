const STORAGE_KEY = 'notes-app-notes';

export const defaultNotes = [
  {
    id: 1,
    title: 'Ideas for the next project',
    content: 'A few directions worth exploring before the next planning session.',
    color: '#d6e1b6',
    tags: ['ideas', 'planning'],
    pinned: true,
    updated: 'Today, 9:42 AM',
  },
  {
    id: 2,
    title: 'Reading list',
    content: 'Books, essays, and references to come back to when there is time.',
    color: '#c7dfe2',
    tags: ['personal'],
    pinned: false,
    updated: 'Yesterday, 4:18 PM',
  },
  {
    id: 3,
    title: 'Weekly planning notes',
    content: 'Priorities, loose ends, and the small wins from this week.',
    color: '#eadcad',
    tags: ['planning'],
    pinned: true,
    updated: 'Jun 18, 2024',
  },
  {
    id: 4,
    title: 'Grocery list',
    content: 'Fresh fruit, coffee, and the ingredients for Sunday dinner.',
    color: '#ead0c7',
    tags: ['personal'],
    pinned: false,
    updated: 'Jun 16, 2024',
  },
];

export function getNotes() {
  const storedNotes = window.localStorage.getItem(STORAGE_KEY);
  if (!storedNotes) return defaultNotes;

  try {
    return JSON.parse(storedNotes);
  } catch {
    return defaultNotes;
  }
}

export function saveNotes(notes) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
