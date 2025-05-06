import { RolesEnum } from "interfaces";
import { useState, useEffect } from "react";
import { authService } from "services";

interface AuthState {
  isAuthenticated: boolean;
  userRole: RolesEnum | null;
  userId: string | null;
  hasRole: (roles: RolesEnum[]) => boolean;
  logout: () => Promise<void>;
}

export default function useAuth(): AuthState {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<RolesEnum | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");
    const id =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role as RolesEnum);
      setUserId(id);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserId(null);
    }
  }, []);

  // Kiểm tra xem người dùng có quyền không
  const hasRole = (roles: RolesEnum[]): boolean => {
    if (!isAuthenticated || !userRole) return false;
    return roles.includes(userRole);
  };

  // Đăng xuất
  const logout = async (): Promise<void> => {
    try {
      const refreshToken =
        localStorage.getItem("refreshToken") ||
        sessionStorage.getItem("refreshToken") ||
        "";
      await authService.logout(refreshToken);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Xóa tất cả dữ liệu lưu trữ
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("role");

      // Cập nhật state
      setIsAuthenticated(false);
      setUserRole(null);
      setUserId(null);

      // Chuyển hướng về trang đăng nhập
      window.location.href = "/login";
    }
  };

  return {
    isAuthenticated,
    userRole,
    userId,
    hasRole,
    logout,
  };
}
