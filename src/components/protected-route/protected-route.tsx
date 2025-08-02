import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  element: JSX.Element;
  isAuth: boolean;
  authRequired: boolean;
  redirectPath: string;
};

export const ProtectedRoute = ({
  element,
  isAuth,
  authRequired,
  redirectPath
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (authRequired && !isAuth) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  if (!authRequired && isAuth) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }
  return element;
};
