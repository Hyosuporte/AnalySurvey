import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "./components/Loading";

export function ProtectedRoutes() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
