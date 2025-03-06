import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useForgotPasswordForm = () => {
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleResetPassword = () => {
        if(!password){
            toast.error("Please fill in both Password");
            return;
        }
        toast.success("Reset password successfully!");
        navigate("/login");
    }
    return{
        password,
        setPassword,
        handleResetPassword,
        showPassword,
        setShowPassword,
        confirmPassword,
        setConfirmPassword
    };
}