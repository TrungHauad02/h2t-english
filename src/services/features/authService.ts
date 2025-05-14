import axios from "axios";
import apiClient from "services/apiClient";

const BASE_URL = "http://localhost:8080/api";

const authClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async (email: string, password: string) => {
  try {
    const response = await authClient.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const loginWithGoogle = async (token: string) => {
  try {
    const response = await authClient.post("/auth/login-with-google", {
      idToken: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

const logout = async (refreshToken: string) => {
  try {
    const response = await apiClient.post("/auth/logout", { refreshToken });
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

const refreshToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.post("/auth/refresh-token", {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// Lấy thông tin user hiện tại từ API
const getCurrentUserFromAPI = async () => {
  try {
    const response = await apiClient.get("/auth/current-user");
    return response.data;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};

// Lấy thông tin user từ localStorage (đã lưu sau khi login)
const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};

// Lưu thông tin user vào localStorage
const saveCurrentUser = (user: any) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Xóa thông tin user khỏi localStorage
const clearCurrentUser = () => {
  localStorage.removeItem("user");
};

// Lấy token từ localStorage
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Lưu token vào localStorage
const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// Xóa tokens khỏi localStorage
const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Cập nhật hàm login để lưu user info
const enhancedLogin = async (email: string, password: string) => {
  try {
    const response = await login(email, password);
    if (response.status === "SUCCESS" && response.data) {
      const { accessToken, refreshToken, userId, role } = response.data;
      saveTokens(accessToken, refreshToken);
      
      // Lấy thông tin user sau khi login thành công
      const userResponse = await getCurrentUserFromAPI();
      if (userResponse.status === "SUCCESS" && userResponse.data) {
        saveCurrentUser(userResponse.data);
      }
    }
    return response;
  } catch (error) {
    console.error("Error in enhanced login:", error);
    throw error;
  }
};

// Cập nhật hàm loginWithGoogle
const enhancedLoginWithGoogle = async (token: string) => {
  try {
    const response = await loginWithGoogle(token);
    if (response.status === "SUCCESS" && response.data) {
      const { accessToken, refreshToken, userId, role } = response.data;
      saveTokens(accessToken, refreshToken);
      
      // Lấy thông tin user sau khi login thành công
      const userResponse = await getCurrentUserFromAPI();
      if (userResponse.status === "SUCCESS" && userResponse.data) {
        saveCurrentUser(userResponse.data);
      }
    }
    return response;
  } catch (error) {
    console.error("Error in enhanced Google login:", error);
    throw error;
  }
};

// Cập nhật hàm logout
const enhancedLogout = async (refreshToken: string) => {
  try {
    const response = await logout(refreshToken);
    // Xóa tất cả thông tin local
    clearTokens();
    clearCurrentUser();
    return response;
  } catch (error) {
    console.error("Error in enhanced logout:", error);
    throw error;
  }
};

export const authService = {
  login: enhancedLogin,
  loginWithGoogle: enhancedLoginWithGoogle,
  logout: enhancedLogout,
  refreshToken,
  getCurrentUser,
  getCurrentUserFromAPI,
  saveCurrentUser,
  clearCurrentUser,
  getAccessToken,
  saveTokens,
  clearTokens,
};