import { Outlet, Navigate } from 'react-router-dom';

interface PrivateProps {
    value : boolean
}

const PrivateRoutes = (props: PrivateProps) => {
  return props.value ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
