import { Outlet, Navigate } from 'react-router-dom';


const PrivateRoutes = () => {
  const token = localStorage.getItem('token');
  return token || token === "" ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
