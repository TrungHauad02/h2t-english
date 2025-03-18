import { User } from "interfaces";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useTeacherAdvance() {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);

    const handleChooseAvatar = (base64: string) => {
        setUser((prevUser) => 
            prevUser ? { ...prevUser, avatar: base64 } : { avatar: base64 } as User
        );
    };    

    const handleSubmit = () => {
        setIsEditing(false);
        toast.success("Submit successfully!");
    };

    const handleChange = () => {
        setIsEditing((prev) => {
            const newEditingState = !prev;
            toast.info(newEditingState ? "Editing enabled" : "Editing disabled");
            return newEditingState;
        });
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

    const handleInputChange = (field: keyof User, value: any) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        } as User)); 
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
