import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated == true ? <Outlet /> : <Navigate to="/auth" />}
    </>
  );
};

export default PrivateRoutes;
