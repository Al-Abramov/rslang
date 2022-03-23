import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../../components/Form/loginForm";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";
import style from '../../components/Form/LoginForm.scss';
import { Alert, Card } from "@mui/material";
import { ErrorObject } from "webpack/node_modules/schema-utils/declarations/validate";
import { UserLogin } from "types";
import { api } from "../../index";

const LoginPage = () => {
  const [isFetching, setFetching] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const loginUser = React.useCallback(async (user: UserLogin) => {
    setFetching(true);

    try {
      const loginUser = await api.loginUser(user);
      const getUser = await api.getUserById();

      dispatch(setUser({token: loginUser.token, email: getUser.email, id: getUser.id, name: getUser.name}));

      navigate('/');
    } catch(error) {
      setErrorMessage((error as Error).message);
    } finally {
      setFetching(false);
    }

  }, []);

  return (
    <div className={style.MainContainer}>
      <Card raised={true} sx={{
          mt: 5,
          width: '400px',
          borderRadius: '20px',
        }}>
      {errorMessage && <Alert severity="error">Не правильный логин или пароль</Alert>}
      <LoginForm
        title="Log in"
        handleClick={loginUser}
        isFetching={isFetching}
      />
      <div className={style.linkContainer}>
        <Link to="/registration">Ещё не зарегистрированы? Регистрация</Link>
      </div>
      </Card>
    </div>
  )
}

export default LoginPage;