import { User } from "interfaces";
import { useState } from "react";

export default function useStudentProfile() {
    const [data, setData] = useState<User | null>(null);
    const [isEditMode, setIseditMode] = useState(false);
    const [formData, setFormData] = useState<User | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            const selectedDate = e.target.value;
            const [year, month, day] = selectedDate.split("-").map(Number);
            setFormData({
                ...formData,
                dateOfBirth: new Date(year, month - 1, day ),
            });
        }
    }           

    const handleAvatarChange = (base64: string) => {
        if (formData) {
            setFormData({
                ...formData,
                avatar: base64,
            });
        }
    };

    const handleSave = () => {
        if (formData) {
            setData(formData);
            // Here you would normally call an API to save the data
            setIseditMode(false);
        }
    };

    const handleCancel = () => {
        setFormData(data);
        setIseditMode(false);
    };  

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-CA");
    };

    return {
        data,
        setData,
        isEditMode,
        setIseditMode,
        formData,
        setFormData,
        handleChange,
        handleDateChange,
        handleAvatarChange,
        handleSave,
        handleCancel,
        formatDate
    };
}