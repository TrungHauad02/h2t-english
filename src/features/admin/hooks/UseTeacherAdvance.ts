import { LevelsEnum, StatusEnum } from "interfaces";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useTeacherAdvance() {
    const [user, setUser] = useState({
        email: "",
        name: "",
        avatar: null as string | null,
        phoneNumber: "",
        dateOfBirth: null as Date | null,
        level: LevelsEnum.BACHELOR,
        status: true,
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);

    const handleChooseAvatar = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser((prevUser) => ({
                    ...prevUser,
                    avatar: e.target?.result as string,
                }));
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

        setUser((prevUser) => ({
            ...prevUser,
            [name]:
                name === "dateOfBirth"
                    ? value
                        ? new Date(value)
                        : null
                    : name === "level"
                    ? (value as LevelsEnum)
                    : name === "status"
                    ? value === StatusEnum.ACTIVE
                    : value,
        }));
    };

    return {
        user,
        setUser,
        isEditing,
        setIsEditing,
        handleChange,
        handleSubmit,
        handleChooseAvatar,
        handleRemove,
        confirmRemove,
        cancelRemove,
        isRemoveDialogOpen,
        handleInputChange,
    };
}
