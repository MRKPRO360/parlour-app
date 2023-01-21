import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import useAdmin from "../../Hooks/useAdmin";
import Spinner from "../../Pages/Shared/Spinner";

export default function AdminRoute({ children }) {
  const { currentuser, loading } = useAuth();
  const email = currentuser?.email;
  const [isAdmin, isAdminLoading] = useAdmin(email);

  const location = useLocation();

  if (loading || isAdminLoading) return <Spinner />;
  return currentuser?.uid && isAdmin ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
