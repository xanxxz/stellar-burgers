import { loginUser, registerUser, logout } from '../slices/authSlice';
import { RootState, useSelector, useDispatch } from '../store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuth, error, checkedAuth } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    isLoading,
    isAuth,
    error,
    checkedAuth,
    login: (data: { email: string; password: string }) =>
      dispatch(loginUser(data)),
    register: (data: { name: string; email: string; password: string }) =>
      dispatch(registerUser(data)),
    logout: () => dispatch(logout())
  };
};
