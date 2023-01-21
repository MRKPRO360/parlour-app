import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Spinner from "../../Pages/Shared/Spinner";

export default function PrivateRoute({ children }) {
  const { currentuser, loading } = useAuth();
  const location = useLocation();

  if (loading) return Spinner;
  return currentuser?.uid ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
