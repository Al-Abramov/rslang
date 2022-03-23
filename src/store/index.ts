import { configureStore } from '@reduxjs/toolkit';
import sprintSlice, { ISprintState } from './slices/sprintSlice';
import textbookSlice, { ITextbookState } from './slices/textbookSlice';
import userReducer, { IUserState } from './slices/userSlice';

export interface StoreInterface {
  user: IUserState,
  textbook: ITextbookState,
  sprint: ISprintState,
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    textbook: textbookSlice,
    sprint: sprintSlice,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
