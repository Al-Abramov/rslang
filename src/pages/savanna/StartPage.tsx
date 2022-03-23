
import React, {useState, useEffect} from "react";
import style from './StartPage.scss';

type GameStartProps = {
  setStartGameDifficulty: (value: number) => void;
  startGame: () => void;
}

export const StartPage = ({setStartGameDifficulty, startGame}:
  GameStartProps) => {
    const changeValue = (event: any) => {
      setStartGameDifficulty(+event.target.value);
    }
    
    // useEffect(() => {
    //   console.log('mount');
    //   return () => {
    //     console.log('anmount');
    //   }
    // }, [setStartGameDifficulty]);

    return (
      <div className={style.gameWrapper}>
      <div className={style.savanna}>
        <div className={style.startPage}>
          <div className={style.text}>
            <h3 className={style.title}>Саванна</h3>
            <p className={style.desc}>Тренировка Саванна развивает словарный запас, помогает не забыть выученные слова.</p>
            <p className={style.desc}>Выберите из предложенных вариантов ответа правильный перевод слова.</p>
          </div>
          <div className={style.buttons}>
            <select className={style.level} onChange={changeValue}>
              <option value="1">Уровень 1</option>
              <option value="2">Уровень 2</option>
              <option value="3">Уровень 3</option>
              <option value="4">Уровень 4</option>
              <option value="3">Уровень 5</option>
              <option value="4">Уровень 6</option>
            </select>

            <button className={style.startButton} onClick={startGame}>Начать</button>
            
          </div>
        </div>
      </div>
      </div>
    )
}