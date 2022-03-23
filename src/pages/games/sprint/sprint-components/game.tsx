import { Card, FormControlState } from "@mui/material";
import { StoreInterface } from "@store/*";
import React, {useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  deleteWordsGame, setAnswer, setAnswerWords, 
  setCardWordGame, setCountTrueAnswer, setDifficulty, setEnd, 
  setScore, setStart 
} from "../../../../store/slices/sprintSlice";
import { BuiletCircle } from "./builetCircle";
import { getRandom } from "./settings";
import style from './sprint.scss';

export interface WordCard {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

const audio = new Audio();

const GameSprint = () => {
  const dispatch = useDispatch();

  const wrongAudioUrl = '../../../../assets/audio/wrong.mp3';
  const correctAudioUrl = '../../../../assets/audio/correct.mp3';

  const [time, setTime] = React.useState(60);
  const {
    words,
    answerTranslate,
    translate,
    score,
    countTrueAnswer,
    word,
    id
  } = useSelector((state: StoreInterface) => state.sprint);

  let coef = useRef(1);

  const generateCard = () => {
    const mainNum = getRandom(0, words.length - 1);
    const secondNum = getRandom(0, words.length - 1);
    const cardsNum = getRandom(0, 2);
debugger
    const mainCard: WordCard = words[mainNum] || {};
    const secondCard: WordCard = words[secondNum];
    const cards = [mainCard, secondCard];

    const word = mainCard.word;
    const answerTranslate = mainCard.wordTranslate;
    const translate = cards[cardsNum].wordTranslate;

    dispatch(setCardWordGame({word: word, answerTranslate: answerTranslate, translate: translate, id: mainCard.id}));
  }


  const onAnswerClick = (answer: boolean) => {
    debugger
    const cardWord = words.find((card: WordCard) => card.id === id);

    if(answer) {
      dispatch(setAnswerWords({trueAnswerWord: cardWord}));
    } else {
      dispatch(setAnswerWords({falseAnswerWord: cardWord}));
    }

    words.length && generateCard();

    let countTrueAnswerLocal = countTrueAnswer;
    let scoreLocal = score;

    if(answer) {
      countTrueAnswerLocal === 3 ? coef.current += 1 : coef.current += 0;

      countTrueAnswerLocal < 3 ? countTrueAnswerLocal += 1 : countTrueAnswerLocal = 0;

      scoreLocal += 10 * coef.current;
    } else {
      countTrueAnswerLocal = 0;
      coef.current = 1;
    }

    dispatch(setCountTrueAnswer({countTrueAnswer: countTrueAnswerLocal}));
    dispatch(setAnswer({answer: answer}));
    dispatch(setScore({score: scoreLocal}));
    dispatch(deleteWordsGame({id}));
  }

  const trueAnswer = () => {
    const answer = translate === answerTranslate;
/*
    if(answer) {
      audio.src = correctAudioUrl;
      audio.play();
    } else {
      audio.src = wrongAudioUrl;
      audio.play();
    }*/
    
    onAnswerClick(answer);
  }

  const falseAnswer = () => {
    const answer = translate !== answerTranslate;
/*
    if(answer) {
      audio.src = correctAudioUrl;
      audio.play();
    } else {
      audio.src = wrongAudioUrl;
      audio.play();
    }*/

    onAnswerClick(answer);
  }

  const answerKeyPress = React.useCallback((e: any) => {
    if(e.code === 'ArrowLeft') {
      debugger
      const answer = translate === answerTranslate;

      onAnswerClick(answer);
    }

    if(e.code === 'ArrowRight') {
      debugger
      const answer = translate !== translate;
    
      onAnswerClick(answer);
    }
  }, [translate, translate, onAnswerClick]);

  React.useEffect(() => {
    generateCard();
  } ,[])

  React.useEffect(() => {
    window.addEventListener('keydown', answerKeyPress);
    const timer = setInterval(() => setTime(time => time - 1), 1000);
    
    return () => {
      window.removeEventListener('keydown', answerKeyPress);
      clearInterval(timer);
    }
  }, [answerKeyPress]);

  React.useEffect(() => {
    if(!words.length || !time) {
      dispatch(setStart({start: false}));
      dispatch(setEnd({end: true}));
      dispatch(setScore({score: 0}));
      dispatch(setCountTrueAnswer({countTrueAnswer: 0}));
      dispatch(setDifficulty({difficulty: null}));
      coef.current += 0;
    }

  }, [words, time]);

  return (
    <>
      <h2 className={style.score}>
        <span>Очки: </span>
        <span>{score}</span>
        <span className={style.scoreItem}>+{10 * coef.current}</span>
      </h2>
      <div className={style.timeWrap}>
        <span>{time}</span>
      </div>
      <Card raised={true} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
        height: '270px',
        backgroundColor: '#f0ffff3d',
        padding: '20px',
      }}>
        <div className={style.circleWrap}>
          {
            [1, 2, 3].map(id => <BuiletCircle key={id} id={id} />)
          }
        </div>
        <div className={style.wordContainer}>
          <span className={style.word}>{word}</span>
        <span className={style.translate}>{translate}</span>
        </div>
        <div className={style.btnsContainer}>
          <button onClick={trueAnswer} className={`${style.btn} ${style.yes}`}>Верно</button>
          <button onClick={falseAnswer} className={`${style.btn} ${style.no}`}>Неверно</button>
        </div>
      </Card>
    </>
  )
}

export default GameSprint