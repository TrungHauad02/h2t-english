import { useNavigate } from "react-router-dom";
import { LevelsEnum, RolesEnum, User } from "interfaces";
import { toast } from "react-toastify";
import { useState } from "react";
import { userService } from "services";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [role, setRole] = useState<RolesEnum>(RolesEnum.STUDENT);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!email || !userName || !password || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }
    if (role === RolesEnum.TEACHER) {
      if (!phoneNumber || !dateOfBirth) {
        toast.error("Teacher must fill in Phone Number and Date of Birth!");
        return;
      }
    }
    if (password !== confirmPassword) {
      toast.error("The confirmed passwords do not match!");
      return;
    }
    try {
      setIsLoading(true);

      const userData: User = {
        id: 0,
        email,
        name: userName,
        password,
        role,
        avatar: avatar ? avatar : "",
        ...(role === RolesEnum.TEACHER && {
          phoneNumber,
          dateOfBirth: dateOfBirth ? dateOfBirth : new Date(),
          level: LevelsEnum.PROFESSOR,
        }),
        status: true,
      };

      // Gọi userService để tạo tài khoản
      const response = await userService.create(userData);

      toast.success(response.data.message);
      navigate("/login");
    } catch (error: any) {
      // Handle error
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChooseAvatar = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    userName,
    setUserName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    avatar,
    setAvatar,
    phoneNumber,
    setPhoneNumber,
    dateOfBirth,
    setDateOfBirth,
    role,
    setRole,
    handleRegister,
    handleChooseAvatar,
    isLoading,
  };
};
