import React from "react";
import { Link } from "react-router-dom";
import { RegForm } from "../../components/Form/regForm";
import { Alert, Card } from "@mui/material";
import { setUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import style from '../../components/Form/LoginForm.scss';
import { User } from "types";
import { api } from "../../index";

const RegistrationPage = () => {
  const [isFetching, setFetching] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const createUser = React.useCallback(async (user: User) => {
    setFetching(true);

    try {
      const createUser = await api.createUser(user);
      const loginUser  = await api.loginUser(user);

     dispatch(setUser({token: loginUser.token, email: createUser.email, id: createUser.id, name: createUser.name}));

     navigate('/');

    } catch (error) {
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
        }} >
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <RegForm
          title="Sign in"
          handleClick={createUser}
          isFetching={isFetching}
        />
        <div className={style.linkContainer}>
          <Link to="/login">Уже зарегистрированы? Войти</Link>
        </div> 
      </Card>
    </div>
  )
}

export default RegistrationPage;
