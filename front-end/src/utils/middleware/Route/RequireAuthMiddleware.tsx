import {
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { AuthStateAttrs } from '../../../utils/interfaces/auth/authInterfaces';

export function RequireAuthMiddleware({ children }: { children: JSX.Element }) {
  const auth = useSelector((state: { auth: AuthStateAttrs }) => state.auth);
  let location = useLocation();

  if (auth.status != "succeeded") 
    return <Navigate to="/" state={{ from: location }} replace />;

  return children;
}