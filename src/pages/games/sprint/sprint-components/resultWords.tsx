import React from "react";
import { WordCard } from "./game";
import style from './sprint.scss';

export const ResultWords: React.FC<WordCard> = (props) => {
  return (
    <>
      <p className={style.wordTitle}>
        <span className={style.wordTitleBold}>{props.word}</span>
        <span> - </span>
        <span>{props.wordTranslate}</span>
      </p>
    </>
  ) 
}
