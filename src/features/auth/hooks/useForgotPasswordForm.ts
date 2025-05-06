import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { emailService } from "services";

export const useForgotPasswordForm = (email: string) => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!password) {
      toast.error("Please fill in both Password");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("The confirmed passwords do not match!");
      return;
    }
    try {
      const response = await emailService.resetPassword(email, password);
      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };
  return {
    password,
    setPassword,
    handleResetPassword,
    showPassword,
    setShowPassword,
    confirmPassword,
    setConfirmPassword,
  };
};
