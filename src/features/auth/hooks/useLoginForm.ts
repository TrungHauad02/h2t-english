import { RolesEnum } from "interfaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "services";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      setIsLoading(true);

      const response = await authService.login(email, password);
      const authData = response.data;

      if (!authData.authenticated) {
        toast.error("Invalid email or password");
        return;
      }

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("accessToken", authData.accessToken);
      storage.setItem("refreshToken", authData.refreshToken);
      storage.setItem("userId", authData.userId.toString());
      storage.setItem("role", authData.role);

      toast.success("Login successful!");

      redirectBasedOnRole(authData.role);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your email and password.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (token: string) => {
    try {
      setIsLoading(true);

      const response = await authService.loginWithGoogle(token);
      const authData = response.data;

      if (!authData.authenticated) {
        toast.error("Google authentication failed");
        return;
      }

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("accessToken", authData.accessToken);
      storage.setItem("refreshToken", authData.refreshToken);
      storage.setItem("userId", authData.userId.toString());
      storage.setItem("role", authData.role);

      toast.success("Login with Google successful!");

      redirectBasedOnRole(authData.role);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Login with Google failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectBasedOnRole = (role: RolesEnum) => {
    switch (role) {
      case RolesEnum.ADMIN:
        navigate("/admin");
        break;
      case RolesEnum.TEACHER:
        navigate("/teacher");
        break;
      case RolesEnum.TEACHER_ADVANCE:
        navigate("/teacher-advance");
        break;
      default:
        navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      const refreshToken =
        localStorage.getItem("refreshToken") ||
        sessionStorage.getItem("refreshToken");

      if (refreshToken) {
        await authService.logout(refreshToken);
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("role");

      // Chuyển hướng về trang login
      navigate("/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("role");

      // Chuyển hướng về trang login
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    rememberMe,
    setRememberMe,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
  };
};
