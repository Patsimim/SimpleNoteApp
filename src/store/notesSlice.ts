import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface NotesState {
  notes: Note[];
  searchQuery: string;
}

const initialState: NotesState = {
  notes: [],
  searchQuery: "",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) => {
      state.notes.push({
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        createdAt: new Date().toISOString(),
      });
    },
    updateNote: (
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>
    ) => {
      const { id, title, description } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.description = description;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, setSearchQuery } =
  notesSlice.actions;
export default notesSlice.reducer;
export type { Note };
