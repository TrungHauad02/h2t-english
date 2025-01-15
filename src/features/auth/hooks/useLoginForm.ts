import { toast } from "react-toastify";
import users from "../services/mockData";
import { useNavigate } from "react-router-dom";
import { RolesEnum, StatusEnum } from "interfaces";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
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

    if (user.status === StatusEnum.INACTIVE) {
      toast.error("Account locked, please contact Admin for support!");
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
    handleLogin,
  };
};