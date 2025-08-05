import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { logoutUser } from '../../services/slices/authSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { ProfileMenuUI, Preloader } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .finally(() => {
        navigate('/login');
      });
  };

  if (isLoading) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
