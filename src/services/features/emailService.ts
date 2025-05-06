import apiClient from "services/apiClient";

const sendOTP = async (email: string) => {
  try {
    const response = await apiClient.post("/email/send-otp", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await apiClient.post("/email/verify-otp", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("Error validating OTP:", error);
    throw error;
  }
};

const resetPassword = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/email/reset-password", {
      email,
      newPassword: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export const emailService = {
  sendOTP,
  verifyOTP,
  resetPassword,
};
