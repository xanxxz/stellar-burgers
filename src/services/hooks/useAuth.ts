import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { loginUser, registerUser, logout } from '../slices/authSlice';
import { AppDispatch } from '../store';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isAuth, error } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    isLoading,
    isAuth,
    error,
    login: (data: { email: string; password: string }) =>
      dispatch(loginUser(data)),
    register: (data: { name: string; email: string; password: string }) =>
      dispatch(registerUser(data)),
    logout: () => dispatch(logout())
  };
};
