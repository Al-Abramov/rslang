
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Word } from "types";

import style from './EndPage.scss';

type ResultWord = {
  'word': string,
  'id': string,
  'audio': string,
  'translation': string,
  'isCorrect': boolean,
}

const url = 'https://rslang-team54.herokuapp.com';


export const EndPage = ({correctWords, wrongWords, setGameStart}: 
  {correctWords: Word[], wrongWords: Word[], setGameStart: () => void}) => {

  const playAudio = (event: any) => {
    const wordAudio = new Audio();
    wordAudio.src = `${url}/${event.target.value}`;
    wordAudio.play();
  }

  const startGame = () => {
    setGameStart();
  }

  return (
    <div className={style.popup}>
      <div className={style.popupBody}>
        <div className={style.popupContent}>
          <h2 className={style.title}>Результат</h2>
          <h3 className={style.subtitle}>Знаю: {correctWords.length}</h3>
          <ul className={style.words}>

            {correctWords && correctWords.map(word => (
              <li key={word.id}>
                <div className={style.wordWrapper}>
                  <button className={style.audioBtn} onClick={playAudio} value={word.audio}></button>
                  <p className={style.word}>{word.word}</p>
                  <p> - </p>
                  <p>{word.wordTranslate}</p>
                </div>
              </li>
        
            ))}
            
          </ul>
          <hr></hr>
          <h3 className={`${style.subtitle} ${style.subtitleError}`}>Ошибок: {wrongWords.length}</h3>
          <ul className={style.words}>

            {wrongWords && wrongWords.map(word => (
              <li key={word.id}>
                <div className={style.wordWrapper}>
                  <button className={style.audioBtn} onClick={playAudio} value={word.audio}></button>
                  <p className={style.word}>{word.word}</p>
                  <p> - </p>
                  <p>{word.wordTranslate}</p>
                </div>
              </li>
        
            ))}
            
          </ul>
          <Link to="/games">
            <button className={style.closeBtn}></button>
          </Link>
        </div>
        <div className={style.popupButtons}>
          <button className={style.popupButton} onClick={startGame}>Играть еще</button>
          <Link to="/games">
            <button className={style.popupButton}>К списку игр</button>
          </Link>
        </div>
      </div>
    </div>
  )
}