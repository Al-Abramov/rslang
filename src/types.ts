export const NORMAL_DIFFICULTY = 'normal';
export const HARD_DIFFICULTY = 'hard';
export const EASY_DIFFICULTY = 'easy';

export type Word = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
};

//export type Difficulty = 'hard' | 'normal' | 'easy';

export type UserWord = {
  difficulty: string,
  optional?: {},
};

export type UserLogin = {
  email: string,
  password: string,
}

export type User = {
  name: string,
  email: string,
  password: string,
}

export type Auth = {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string,
}

export type Statistic = {
  learnedWords: number,
  optional: {},
}

export type Settings = {
  wordsPerDay: number,
  optional: {},
}

export type Config = {
  method: string,
  headers: {},
  body?: string,
}