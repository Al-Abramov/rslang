import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  words: [],
};

export interface ITextbookState {
  words: [],
}

const textbookSlice = createSlice({
  name: 'textbook',
  initialState,
  reducers: {
    setTextbook(state, action) {
      state.words = action.payload.words;
    },
    setWordById (state, action) {
      let word: any = state.words.find(({_id}) => _id === action.payload.id);
      word.userWord = {difficulty: action.payload.difficulty};   
      state.words = state.words;
    },
    removeWord(state, action) {
      let word: any = state.words.find(({_id}) => _id === action.payload.id);
      word.userWord = null;
      state.words = state.words;
    }
  },
});

export const {setTextbook, setWordById, removeWord} = textbookSlice.actions;

export default textbookSlice.reducer;