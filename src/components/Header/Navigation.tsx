
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useSelector} from 'react-redux';
import { useAuth } from '../../hooks/use-auth';
import { removeUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import style from './Header.scss';

const SideBar = ({isOpen, close}:{isOpen: boolean, close: ()=>void}) => {

  return (
      <div className={`${style.sideBar} ${isOpen ? style.sideBar_active : null}`}> 
        <div className={style.menuWrapper}>
          <div className={style.buttonWrapper}>
            <button className={style.buttonClose} onClick={close}></button>
          </div>
        <ul className={style.menuList}>
          <li>
            <Link to="/" className={`${style.menuLink} ${style.menuLink1}`} onClick={close}>Главная</Link>
          </li>
          <li>
            <Link to="/textbook" className={`${style.menuLink} ${style.menuLink2}`} onClick={close}>Учебник</Link>
          </li>
          <li>
            <Link to="/games" className={`${style.menuLink} ${style.menuLink3}`} onClick={close}>Игры</Link>
          </li>
          <li>
            <Link to="/statistics" className={`${style.menuLink} ${style.menuLink4}`} onClick={close}>Статистика</Link>
          </li>
          <li>
            <Link to="/team" className={`${style.menuLink} ${style.menuLink5}`} onClick={close}>О команде</Link>
          </li>
        </ul>
        </div>
      
      </div>
    
  )
}

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const openSideBar = () => {
    setOpen(true);
  }
  const closeSideBar = () => {
    setOpen(false);
  }

  const dispatch = useAppDispatch();
  const user = useSelector((state: {user: {id: string, token: string, email: string, name: string}}) => state);
 
  const auth = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
   dispatch(removeUser());
   localStorage.clear();
   navigate('/');
  } 

  return(
    <>
    <header className={style.header}>
      <div className={style.headerContainer}>
        <button className={style.headerMenu} onClick={openSideBar}></button>
         <Link className={style.headerLogo} to="/">
          <span className={style.headerLogo}>RSLang</span>
        </Link>
        <div className={style.headerUser}>
          <div className={style.headerInfo}>
            <div className={style.headerName}>{user.user.name}</div>
            <div className={style.headerEmail}>{user.user.email}</div>
          </div>
          {auth.isAuth && <button className={style.headerLogout} onClick={logOut}>
            <svg className={style.logoutBtn} viewBox="0 0 24 24" >
              <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z">
              </path>
            </svg>
          </button>}
        </div>
      </div>
    </header>
    <SideBar isOpen={open} close={closeSideBar}/>
    </>
  )
}