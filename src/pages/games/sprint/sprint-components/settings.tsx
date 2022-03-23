import React from "react";
import style from './sprint.scss';
import { useDispatch, useSelector } from "react-redux";
import { setDifficulty, setStart, setWordsGame } from "../../../../store/slices/sprintSlice";
import { DifficultyBtn } from "./difficultyBtn";
import { api } from "../../../../index";
import { StoreInterface } from "@store/*";
import { CircularProgress } from "@mui/material";

export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const SettingsSprint = () => {
  const dispatch = useDispatch();
  const [isFetching, setFetching] = React.useState(false);

  const {difficulty} = useSelector((state: StoreInterface) => state.sprint);

  const difficultyHandle = async (id: number) =>{
    const page = getRandom(0, 30);

    setFetching(true);
    const response = await api.getWords(page - 1, id);
    
    dispatch(setDifficulty({difficulty: id}));
    dispatch(setWordsGame({words: response}));
    setFetching(false);
  }

  const startGame = () => {
    dispatch(setStart({start: true}));
  }

  return (
        <>
          <div className={style.innerContainer}>
            <h2 className={style.sprintTitle}>Спринт</h2>
            <p className={style.sprintSubttl}>
              Угадай максимальное количество слов за 1 минуту
            </p>
          </div>
          <div>
            <div className={style.btnsWrap}>
              <span className={style.sprintSubttl}>Сложность:</span>
              <div className={style.mt}>
                {
                  [0, 1, 2, 3, 4, 5].map(id => <DifficultyBtn key={id} id={id} difficultyHandle={difficultyHandle}/>)
                }
              </div>
              {
                isFetching && 
                <div className={style.progressCenter}>
                  <CircularProgress size={80} sx={{position: "absolute"}} />
                </div>
              }
              <button disabled={difficulty || difficulty === 0 ? false : true} onClick={startGame} className={`${style.startBtn} ${difficulty || difficulty === 0 ? style.startActive : ''}`}>Старт</button>
            </div>
            <div className={style.sbttlWrap}>
              <span className={style.sprintSubttl}>Чтобы выбрать, используйте:</span>
              <p className={style.choiceWrap}>
                <i className={`${style.icon} ${style.mouseIcon}`}></i>
                <span>Мышь</span>
              </p>
              <p className={style.choiceWrap}>
                <i className={`${style.icon} ${style.arrowIcon}`}></i>
                <span>Клавиши влево и вправо</span>
              </p>
            </div>
          </div>
        </>
  )
}

export default SettingsSprint