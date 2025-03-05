import { useNavigate } from "react-router-dom";
import { RolesEnum } from "interfaces";
import { toast } from "react-toastify";
import { useState } from "react";

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

    const handleRegister = async () => {
        if(!email || !userName || !password || !confirmPassword){
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
    
        navigate("/login")
        toast.success("Registration successful!");
    };    

    const handleChooseAvatar = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target?.result as string);
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
        handleChooseAvatar
    };
};
