import React from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useSelector} from 'react-redux';
import { useAuth } from '../../hooks/use-auth';
import { removeUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import style from './home.scss';
import { Link } from "react-router-dom";
import { dividerClasses } from "@mui/material";

const HomePage = () => {
 const dispatch = useAppDispatch();
 const user = useSelector((state: {user: {id: string, token: string, email: string, name: string}}) => state);
 
 const auth = useAuth();
 const navigate = useNavigate();

 const logOut = () => {
  dispatch(removeUser());
  localStorage.clear();
  navigate('/');
 } 
 
  return (
    <>
      <main className={style.main}>
        <section className={style.promo}>
          <div className={style.promoContainer}>
            <div className={style.promoWrapper}>
              <h2 className={style.promoTitle}>RSLang - удобное приложение <br/> для изучения английского языка!</h2>
              <p className={style.promoText}>Все самые лучшие методики в одном месте.</p>
              {auth.isAuth ? <div></div> : (
                <div className={style.buttons}>
                  <Link to="/login">
                    <button className={style.button}>Войти</button>
                  </Link>
                  <Link to="/registration">
                    <button className={style.button}>Регистрация</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className={style.advantages}>
          <div className={style.container}>
            <h2 className={style.title}>О проекте</h2>
            <p className={style.advantagesDesc}>Приложение поможет изучать иностранные слова с помощью техники интервального повторения, мини-игр
              и отслеживания индивидуального прогресса</p>
            <div className={style.items}>
              <div className={style.card}>
                <div className={`${style.cardImg} ${style.cardImg1}`}></div>
                <span className={style.cardTitle}>Учебник</span>
                <p className={style.cardText}>
                  Более 3500 тысяч слов для изучения, разбитых на разделы по уровню Вашей подготовки с удобной навигацией
                </p>
              </div>
              <div className={style.card}>
                <div className={`${style.cardImg} ${style.cardImg2}`}></div>
                <span className={style.cardTitle}>Словарь</span>
                <p className={style.cardText}>
                  Создайте свой персональный словарь для изучения слов
                </p>
              </div>
              <div className={style.card}>
                <div className={`${style.cardImg} ${style.cardImg3}`}></div>
                <span className={style.cardTitle}>Игры</span>
                <p className={style.cardText}>
                  Сделайте изучение слов более увлекательным с помощью мини-игр
                </p>
              </div>
              <div className={style.card}>
                <div className={`${style.cardImg} ${style.cardImg4}`}></div>
                <span className={style.cardTitle}>Статистика</span>
                <p className={style.cardText}>
                  Следите за своим прогрессом каждый день
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage;
