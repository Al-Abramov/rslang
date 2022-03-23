import React, {useState, useEffect, useCallback} from "react";
import style from './GamePage.scss';
import {Api} from '../../api/api';
import { Word } from "types";
import { Questions } from "./Questions";
import { Spinner } from "./Spinner";

const api = new Api();

const url = 'https://rslang-team54.herokuapp.com';


export const GamePage = ({difficulty, setGameEnd, setResultWords}: 
  {difficulty: number, setGameEnd: () => void, setResultWords: (correctWords: Word[], wrongWords: Word[]) => void}) => {

  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState<Word | null>(null);
  const [round, setRound] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState<Word[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  

  const shuffle = (array: Word[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const fetchWords = useCallback(async () => {
    setIsLoading(true);
    const fetchedWords = await api.getWords(round, difficulty);
    shuffle(fetchedWords);
    const randomWords = fetchedWords.slice(0, 5);
    
    setWords(randomWords);
    setIsLoading(false);
    const i = getRandom(0, randomWords.length - 1);
    setAnswer(randomWords[i]);
    
    if (answer) {
      playAudio();
    }

    setIsAnswered(false);
    
  }, [difficulty, round]);

  useEffect(() => {
    fetchWords();
  
  }, [fetchWords]);

  useEffect(() => {

    document.addEventListener('keypress', onKeypress);
  
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [answer]);

  const onKeypress = (e: any) => {
    if (e.code === 'Space') {
      e.preventDefault();
      playAudio();
    }
  };
  
  const handleAnswer = (wordId: string) => {
    if ( answer?.id === wordId) {
      resultWords(true);
      
    }
    else {
      resultWords(false);
    }
  
    setIsAnswered(true);
    setAnsweredCount(answeredCount + 1);
  }

  const playAudio = () => {
    const wordAudio = new Audio();
    wordAudio.src = `${url}/${answer?.audio}`;
    wordAudio.play();
  }

  const nextRound = () => {
    setAnswer(null);
    if (answeredCount < 10) {
      //const page = getRandom(0, 29);
      setRound(round+1);
    }
    else {
      setGameEnd();
      setResultWords(correctAnswers, wrongAnswers);
    }
  }

  const resultWords = (isCorrect: boolean) => {
    if (isCorrect && answer) {
      setCorrectAnswers([...correctAnswers, answer]);
    }
    else if (answer) {
      setWrongAnswers([...wrongAnswers, answer]);
    }
  }

  return (
    <div className={style.gameAudioWrapper}>
    <div className={style.audiocall}>
      {isLoading ? 
      <Spinner /> :
      <div className={style.gameAudioPage}>
        <div className={style.contentWrapper}>
          <div className={`${style.wordImg} ${isAnswered ? '' : style.hide}`}>
            <img src={`${url}/${answer?.image}`}></img>
          </div>
          <div className={style.audioWrapper}>

            <button className={`${style.audioElement} ${isAnswered ? style.audioSmall : style.audioLarge}`}
              onClick={playAudio}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
              </svg>
            </button>
            
            <p className={`${style.correctAudioWord} ${isAnswered ? '' : style.hide}`}>
              {answer?.word}
            </p>
          </div>
        </div>
        <Questions words={words} answer={answer} handleAnswer={handleAnswer} 
          isAnswered = {isAnswered} nextRound={nextRound}/>
      </div>
      }
    
      </div>
    </div>
    
  )
}