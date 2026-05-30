export interface Note {
  id: string; // UUID
  title: string;
  body: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CreateNoteInput {
  title: string;
  body: string;
}

export interface UpdateNoteInput {
  title?: string;
  body?: string;
}

export interface NoteFilters {
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "title";
  order?: "asc" | "desc";
}

// For optimistic updates or local state
export type NoteDraft = Partial<Note> & { title?: string; body?: string };
