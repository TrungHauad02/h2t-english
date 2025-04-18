import { useState } from "react";
import { toast } from "react-toastify";
import users from "../services/mockData";
import { useNavigate } from "react-router-dom";
import { RolesEnum } from "interfaces";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      toast.error("Invalid email or password. Please try again.");
      return;
    }

    if (user.status === false) {
      toast.error("Account locked!");
      return;
    }

    toast.success(`Welcome, ${user.name}!`);
    switch (user.roleEnum) {
      case RolesEnum.STUDENT:
        navigate("/");
        break;
      case RolesEnum.ADMIN:
        navigate("/admin");
        break;
      case RolesEnum.TEACHER:
        navigate("/teacher");
        break;
      default:
        toast.error("Unauthorized role. Please contact support.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleLogin,
  };
};
