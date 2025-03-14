import { User } from "interfaces";
import { useState } from "react";

export default function useStudentProfile() {
    const [data, setData] = useState<User | null>(null);
    const [editMode, setEditMode] = useState(false);
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
            setFormData({
                ...formData,
                dateOfBirth: new Date(e.target.value),
            });
        }
    };

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
            setEditMode(false);
        }
    };

    const handleCancel = () => {
        setFormData(data);
        setEditMode(false);
    };

    return {
        data,
        setData,
        editMode,
        setEditMode,
        formData,
        setFormData,
        handleChange,
        handleDateChange,
        handleAvatarChange,
        handleSave,
        handleCancel,
    };
}