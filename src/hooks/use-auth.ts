import { setUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

export function useAuth() {
  const {token, id} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const tokenUser = localStorage.getItem('token');
  
  if(userId) {
    dispatch(setUser({token: tokenUser, id: userId, name: userName}));
  }

  return {
    isAuth: !!id,
    token,
    id,
  };
}