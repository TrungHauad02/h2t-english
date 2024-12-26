import { toast } from "react-toastify";
import users from "../services/mockData";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (!email || !password) {
        toast.error("Please fill in both email and password.");
        return;
      }

    if (!user) {
      toast.error("Invalid email or password. Please try again.");
    } else {
      toast.success(`Welcome, ${user.name}!`);

      if (user.role_enum === "Student") {
        navigate("/");
      } else if (user.role_enum === "Admin") {
        navigate("/admin");
    } else if (user.role_enum === "Teacher") {
        navigate("/teacher");
      } else {
        toast.error("Unauthorized role. Please contact support.");
      }
    }
  };

  return {
    handleLogin,
  };
};

