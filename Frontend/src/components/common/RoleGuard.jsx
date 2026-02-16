import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function RoleGuard({ allowedRole, children }) {
  const { currentUser, role } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}
