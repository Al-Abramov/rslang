import React from "react";
import { Link } from "react-router-dom";
import style from './games.scss';

const GamesPage = () => {
  return (
    <div className={style.gameMenu}>
      <div className={style.gameWrapper}>
        <div className={style.cards}>
        <div className={`${style.card} ${style.cardSprint}`}>
            <Link className={style.cardLink} to="/games/sprint"></Link>
            <h3 className={style.cardTitle}>Спринт</h3>
          </div>
    
          <div className={`${style.card} ${style.cardAudiocall}`}>
            <Link className={style.cardLink} to="/games/audiocall"></Link>
            <h3 className={style.cardTitle}>Аудиовызов</h3>
          </div>
  
          <div className={`${style.card} ${style.cardSavanna}`}>
            <Link className={style.cardLink} to="/games/savanna"></Link>
            <h3 className={style.cardTitle}>Саванна</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamesPage