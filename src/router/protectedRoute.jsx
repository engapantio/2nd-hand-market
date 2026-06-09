import { useAppSelector } from '../app/hooks.js';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuth = useAppSelector((s) => !!s.auth.user);
  if (!isAuth) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
