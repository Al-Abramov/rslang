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
    // for (let i = array.length - 1; i > 0; i--) {
    //   let j = Math.floor(Math.random() * (i + 1));
    //   [array[i], array[j]] = [array[j], array[i]];
    // }
    array.sort(() => Math.random() - 0.5);
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
    
    //playAudio();
  
    setIsAnswered(false);
    
  }, [difficulty, round]);

  useEffect(() => {
    fetchWords();
  
  }, [fetchWords]);

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

  const handleWrongAnswer = () => {
  
    resultWords(false);
    setIsAnswered(true);
    setAnsweredCount(answeredCount + 1);
  }

  const nextRound = () => {
    setAnswer(null);
    if (answeredCount < 10) {
      const page = getRandom(0, 29);
      setRound(page);
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
    <div className={style.gameWrapper}>
      <div className={style.savanna}>

        {isLoading ? 
        <Spinner /> :
        <div className={style.gamePage}>
          <div className={style.wrapper}>
          
            <div className={style.savannaWrapper}>

              <p className={`${style.correctWord} ${!isAnswered ? style.animation : style.hide}`}>
                {answer?.word}
              </p>
            </div>
          </div>
          <Questions words={words} answer={answer} handleAnswer={handleAnswer} 
            handleWrongAnswer={handleWrongAnswer} isAnswered = {isAnswered} nextRound={nextRound}/>
        </div>
      }
    
      </div>
    </div>
    
  )
}