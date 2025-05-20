import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RolesEnum } from "interfaces";

interface ProtectedRouteProps {
  allowedRoles: RolesEnum[];
  redirectPath?: string;
}

export default function ProtectedRoute({
  allowedRoles,
  redirectPath = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();

  const userRole =
    localStorage.getItem("role") || sessionStorage.getItem("role");
  const isAuthenticated =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (!isAuthenticated) {
    const currentPath = location.pathname + location.search;
    if (currentPath !== "/login") {
      sessionStorage.setItem("redirectAfterLogin", currentPath);
    }
    return <Navigate to={redirectPath} replace />;
  }

  if (!allowedRoles.includes(userRole as RolesEnum)) {
    switch (userRole) {
      case RolesEnum.STUDENT:
        return <Navigate to="/" replace />;
      case RolesEnum.TEACHER:
        return <Navigate to="/teacher" replace />;
      case RolesEnum.TEACHER_ADVANCE:
        return <Navigate to="/teacher-advance" replace />;
      case RolesEnum.ADMIN:
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
}
