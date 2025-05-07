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

export const authService = {
  login,
  logout,
  loginWithGoogle,
  refreshToken,
};
