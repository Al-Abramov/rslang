import { StoreInterface } from "@store/*";
import React from "react";
import { useSelector } from "react-redux";
import style from './sprint.scss';

interface BuiletCircleProps {
  id: number,
}

export const BuiletCircle: React.FC<BuiletCircleProps> = ({id}) => {
  const {countTrueAnswer} = useSelector((state: StoreInterface) => state.sprint);
  
  const isActive = countTrueAnswer >= id;

  return (
    <span className={`${style.circle} ${isActive ? style.startActive : ''}`}></span>
  ) 
}
