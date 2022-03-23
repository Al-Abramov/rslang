import { StartPage } from "./StartPage";
import React, {useState} from "react";
import { EndPage } from "./EndPage";
import { GamePage } from "./GamePage";
import { Word } from "types";

type Game = 'start' | 'game' | 'end';


export const AudioCall = () => {
  const [game, setGame] = useState<Game>('start');
  const [difficulty, setDifficulty] = useState(0);

  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [wrongWords, setWrongWords] = useState<Word[]>([]);


  const setGameDifficulty = (value: number) => {
    setDifficulty(value);
  }
  const setGameState = () => {
    setGame('game');
  }

  const setGameStart = () => {
    setGame('start');
  }

  const setGameEnd = () => {
    setGame('end');
  }

  const setResultWords = (correctWords: Word[], wrongWords: Word[]) => {
    setCorrectWords(correctWords);
    setWrongWords(wrongWords);
  }

  return(
    <>
      {game === 'start' && <StartPage setStartGameDifficulty={setGameDifficulty} startGame={setGameState}/>}
      {game === 'game' && <GamePage difficulty={difficulty} setGameEnd={setGameEnd} setResultWords={setResultWords}/>}
      {game === 'end' && <EndPage correctWords={correctWords} wrongWords={wrongWords} setGameStart={setGameStart}/>}
    </>
  )
}