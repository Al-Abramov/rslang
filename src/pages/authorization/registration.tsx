import { Api } from "../../api/api";
import React from "react";
import { Link } from "react-router-dom";
import { RegForm } from "../../components/Form/regForm";
import { Alert } from "@mui/material";
import { setUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import style from '../../components/Form/LoginForm.scss';
import { User } from "types";

const RegistrationPage = () => {
  const api = new Api();

  const [isFetching, setFetching] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  //const userState = useSelector((state: {user: {id: string, token: string, email: string}}) => state.user);

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
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <RegForm
        title="Sign in"
        handleClick={createUser}
        isFetching={isFetching}
      />
      <div className={style.linkContainer}>
        <Link to="/login">Log in</Link>
      </div> 
    </div>
  )
}

export default RegistrationPage;
