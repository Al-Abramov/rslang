import React, { PropsWithChildren, useState} from "react";
import { Link } from "react-router-dom";
import style from './Main.scss';
import { Navigation } from "../Header/Navigation";
import { Footer } from "../../components/Footer/Footer";


export const Main = ({children}: PropsWithChildren<{}>) => {

  return(
    <div className={style.wrapper}>
      <Navigation />
        <div className={style.main}>
          {children}
        </div>
      <Footer />
    </div>
  )
}