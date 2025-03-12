import { LevelsEnum, StatusEnum } from "interfaces";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UseTeacherAdvance() {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [level, setLevel] = useState<LevelsEnum>(LevelsEnum.BACHELOR);
    const [status, setStatus] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);

    const handleChooseAvatar = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        setIsEditing(false);
        toast.success("Submit successfully!");
    };

    const handleChange = () => {
        setIsEditing((prev) => !prev);
        toast.info(isEditing ? "Editing disabled" : "Editing enabled");
    };

    const handleRemove = () => {
        setRemoveDialogOpen(true);
    };

    const confirmRemove = () => {
        toast.success(`User removed!`);
        setRemoveDialogOpen(false);
    };

    const cancelRemove = () => {
        setRemoveDialogOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "name":
                setName(value);
                break;
            case "phoneNumber":
                setPhoneNumber(value);
                break;
            case "dateOfBirth":
                setDateOfBirth(value ? new Date(value) : null);
                break;
            case "level":
                setLevel(value as LevelsEnum);
                break;
            case "status":
                setStatus(value === StatusEnum.ACTIVE);
                break;
            default:
                break;
        }
    };    

    return {
        email,
        setEmail,
        name,
        setName,
        avatar,
        setAvatar,
        phoneNumber,
        setPhoneNumber,
        dateOfBirth,
        setDateOfBirth,
        level,
        setLevel,
        status,
        setStatus,
        isEditing,
        setIsEditing,
        handleChange,
        handleSubmit,
        handleChooseAvatar,
        handleRemove,
        confirmRemove,
        cancelRemove,
        isRemoveDialogOpen,
        handleInputChange
    };
}