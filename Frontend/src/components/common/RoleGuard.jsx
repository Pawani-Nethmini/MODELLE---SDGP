import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function RoleGuard({ allowedRole, children }) {
  const { currentUser, role, loading } = useAuth();

  // while the auth context is initializing, don't redirect anywhere
  if (loading) {
    return null; // could show spinner if desired
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // authenticated but wrong role
    return <Navigate to="/" replace />;
  }

  return children;
}
