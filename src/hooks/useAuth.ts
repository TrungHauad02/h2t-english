import { RolesEnum } from "interfaces";
import { useState, useEffect, useCallback } from "react";
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

  // Hàm đọc userId từ storage
  const getUserIdFromStorage = useCallback((): string | null => {
    return (
      localStorage.getItem("userId") || sessionStorage.getItem("userId") || null
    );
  }, []);

  // Cập nhật state từ localStorage/sessionStorage
  const syncAuthState = useCallback(() => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    setIsAuthenticated(!!token);
    setUserRole(token ? (role as RolesEnum) : null);
  }, []);

  // Khởi tạo state ban đầu
  useEffect(() => {
    syncAuthState();

    // Thêm event listener để đồng bộ khi storage thay đổi
    const handleStorageChange = () => {
      syncAuthState();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [syncAuthState]);

  // Kiểm tra xem người dùng có quyền không
  const hasRole = useCallback(
    (roles: RolesEnum[]): boolean => {
      if (!isAuthenticated || !userRole) return false;
      return roles.includes(userRole);
    },
    [isAuthenticated, userRole]
  );

  // Đăng xuất
  const logout = useCallback(async (): Promise<void> => {
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

      // Chuyển hướng về trang đăng nhập
      window.location.href = "/login";
    }
  }, []);

  // Trả về object với getter cho userId để luôn lấy giá trị mới nhất
  return {
    isAuthenticated,
    userRole,
    get userId() {
      return getUserIdFromStorage();
    },
    hasRole,
    logout,
  };
}
