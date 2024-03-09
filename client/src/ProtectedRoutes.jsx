import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "./components/Loading";

export function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
