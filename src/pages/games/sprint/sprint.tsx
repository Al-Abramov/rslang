import { StoreInterface } from "@store/*";
import React from "react";
import { useSelector } from "react-redux";
import GameSprint from "./sprint-components/game";
import SettingsSprint from "./sprint-components/settings";
import ResultsSprint from "./sprint-components/results";
import style from './sprint-components/sprint.scss';

const SprintPage = () => {
  const {start} = useSelector((state: StoreInterface) => state.sprint);
  const {end} = useSelector((state: StoreInterface) => state.sprint);

  return (
    <div className={style.bgStyle}>
      <div className={style.sprintContainer}>
        {start ? <GameSprint /> : end ? <ResultsSprint /> : <SettingsSprint />}
      </div>
    </div>
  )
}

export default SprintPage;