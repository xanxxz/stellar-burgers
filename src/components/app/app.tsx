import { ReactNode, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, OrderInfo, IngredientDetails, Modal } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import styles from './app.module.css';
import { useAuth } from '../../services/hooks/useAuth';
import { checkUserAuth } from '../../services/slices/authSlice';
import { useDispatch } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(checkUserAuth());
    }
  }, [dispatch]);

  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Информация о заказе' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute
              isAuth={isAuth}
              authRequired={false}
              redirectPath='/'
              element={<Login />}
            />
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute
              isAuth={isAuth}
              authRequired={false}
              redirectPath='/'
              element={<Register />}
            />
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute
              isAuth={isAuth}
              authRequired={false}
              redirectPath='/'
              element={<ForgotPassword />}
            />
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute
              isAuth={isAuth}
              authRequired={false}
              redirectPath='/'
              element={<ResetPassword />}
            />
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute
              isAuth={isAuth}
              authRequired
              redirectPath='/login'
              element={<Profile />}
            />
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute
              isAuth={isAuth}
              authRequired
              redirectPath='/login'
              element={<ProfileOrders />}
            />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute
              isAuth={isAuth}
              authRequired
              redirectPath='/login'
              element={
                <Modal title='Информация о заказе' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
