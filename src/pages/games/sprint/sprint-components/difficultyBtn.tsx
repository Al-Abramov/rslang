import { StoreInterface } from "@store/*";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from './sprint.scss';

interface DifficultyBtnProps {
  difficultyHandle: (id: number) => void,
  id: number,
}

export const DifficultyBtn: React.FC<DifficultyBtnProps> = ({difficultyHandle, id}) => {
  const {difficulty} = useSelector((state: StoreInterface) => state.sprint);
  
  const isActive = difficulty === id;

  const handleClick = React.useCallback(() => {
    difficultyHandle(id);
  }, [difficultyHandle, id]);

  return (
    <button onClick={handleClick} className={`${style.settingsBtn} ${isActive ? style.active : ''}`}>{id + 1}</button>
  ) 
}