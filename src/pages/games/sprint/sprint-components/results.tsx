import { Card } from "@mui/material";
import { StoreInterface } from "@store/*";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResultWords } from "./resultWords";
import style from './sprint.scss';
import { WordCard } from "./game";
import { useNavigate } from "react-router-dom";
import { clearAnswerWords, setEnd, setStart } from "../../../../store/slices/sprintSlice";

const ResultsSprint = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    trueAnswerWords,
    falseAnswerWords,
  } = useSelector((state: StoreInterface) => state.sprint);

  const redirGames = () => {
    navigate('/games')
    dispatch(setStart({start: false}));
    dispatch(setEnd({end: false}));
  }

  const redirNewGames = () => {
    dispatch(clearAnswerWords());
    dispatch(setStart({start: false}));
    dispatch(setEnd({end: false}));
  }

  return (
    <>
      <Card raised={true} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
        height: '500px',
        backgroundColor: '#fff',
        padding: '20px',
        overflow: 'auto'
      }}>
        <h2>Результат</h2>
        <div className={style.wordsContainer}>
          <h3 className={style.studiedTitle}>
            <span>Выучено: </span>
            <span>{trueAnswerWords.length}</span>
          </h3>
          
          {
            trueAnswerWords.map((word: WordCard) => <ResultWords {...word} key={word.id}/>)
          }
        </div>
        <div className={style.wordsContainer}>
          <h3 className={style.wrongTitle}>
            <span>Ошибки: </span>
            <span>{falseAnswerWords.length}</span>
          </h3>
          
          {
            falseAnswerWords.map((word: WordCard) => <ResultWords {...word} key={word.id}/>)
          }
        </div>
      </Card>
      <div className={style.btnsResultContainer}>
        <button onClick={redirNewGames} className={style.resultBtn}>Сыграть ещё раз</button>
        <button onClick={redirGames} className={style.resultBtn}>Перейти к списку игр</button>
      </div>
    </>
  )
}

export default ResultsSprint