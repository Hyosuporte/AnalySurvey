import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
