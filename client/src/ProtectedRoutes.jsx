import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loading } from "./components/Loading";

export function ProtectedRoutes() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!isLoading && !isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
