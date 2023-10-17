import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingPage from "../pages/LoadingPage";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
