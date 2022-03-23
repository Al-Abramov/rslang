import React, {useState} from "react";
import { Link } from "react-router-dom";
import style from './Footer.scss';

export const Footer = () => {
  
  return(
    <>
    <footer className={style.footer}>
      <div className={style.container}>
        <a href="https://rs.school/js/" className={style.rsschool} target="_blank"></a>
        <div className={style.team}>
          <a className={style.teamName} href="https://github.com/Al-Abramov" target="_blank">Alexey Abramov</a>
          <a className={style.teamName} href="https://github.com/ElenaPogodaeva" target="_blank">Elena Pogodaeva</a>
        </div>
        <span>2022</span>
      </div>
    </footer>
    </>
  )
}