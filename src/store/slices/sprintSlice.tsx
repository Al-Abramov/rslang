import { createSlice } from "@reduxjs/toolkit";
import { WordCard } from "pages/games/sprint/sprint-components/game";

const initialState: ISprintState = {
  words: [],
  start: false,
  end: false,
  word: '',
  translate: '',
  answerTranslate: '',
  answer: false,
  trueAnswerWords: [],
  falseAnswerWords: [],
  score: 0,
  countTrueAnswer: 0,
  difficulty: null,
  id: '',
};

export interface ISprintState {
  words: WordCard[];
  start: boolean;
  end: boolean;
  word: string;
  answer: boolean;
  trueAnswerWords: WordCard[];
  falseAnswerWords: WordCard[];
  translate: string;
  answerTranslate: string;
  score: number;
  countTrueAnswer: number;
  difficulty: number | null;
  id: string
}

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    setWordsGame(state, action) {
      state.words = action.payload.words;
    },
    deleteWordsGame(state, action) {
      state.words = state.words.filter((word: WordCard) => word.id !== action.payload.id);
    },
    setDifficulty(state, action) {
      state.difficulty = action.payload.difficulty;
    },
    setStart(state, action) {
      state.start = action.payload.start;
    },
    setEnd(state, action) {
      state.end = action.payload.end;
    },
    setCardWordGame(state, action) {
      state.word = action.payload.word;
      state.translate = action.payload.translate;
      state.answerTranslate = action.payload.answerTranslate;
      state.id = action.payload.id;
    },
    setAnswer(state, action) {
      state.answer = action.payload.answer;
    },
    setScore(state, action) {
      state.score = action.payload.score;
    },
    setAnswerWords(state, action) {
      if (action.payload.trueAnswerWord) {
        state.trueAnswerWords = [...state.trueAnswerWords, action.payload.trueAnswerWord];
      }
      
      if (action.payload.falseAnswerWord) {
        state.falseAnswerWords = [...state.falseAnswerWords, action.payload.falseAnswerWord];
      }
    },
    clearAnswerWords(state) {
        state.trueAnswerWords = [];
        state.falseAnswerWords = [];
    },
    setCountTrueAnswer(state, action) {
      state.countTrueAnswer = action.payload.countTrueAnswer;
    }
  },
});

export const {
  setWordsGame, setDifficulty, setStart, setCardWordGame, 
  setAnswer, setScore, deleteWordsGame, 
  setAnswerWords, setCountTrueAnswer, setEnd, clearAnswerWords
} = sprintSlice.actions;

export default sprintSlice.reducer;