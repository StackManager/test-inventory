import {
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { AuthStateAttrs } from '../../interfaces/auth/authInterfaces';

export function PublicMiddleware({ children }: { children: JSX.Element }) {
  const auth = useSelector((state: { auth: AuthStateAttrs }) => state.auth);
  let location = useLocation();

  if (auth.status == "succeeded") 
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  
  return children;
}