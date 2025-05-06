import { SelectChangeEvent } from "@mui/material";
import useAuth from "hooks/useAuth";
import { LevelsEnum, User } from "interfaces";
import { useEffect, useState } from "react";
import { userService } from "services";

export default function useTeacherInformation() {
  const [data, setData] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const resData = await userService.findById(parseInt(userId));
          setData(resData.data);
          setFormData(resData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    if (formData) {
      if (e.target.name === "level") {
        setFormData({
          ...formData,
          level: e.target.value as LevelsEnum,
        });
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (formData) {
      setFormData({
        ...formData,
        dateOfBirth: date as Date,
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

  const handleSave = async () => {
    if (formData) {
      try {
        const resData = await userService.patch(formData.id, formData);
        setData(resData.data);
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setIsEditMode(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditMode(false);
  };

  return {
    data,
    setData,
    isEditMode,
    setIsEditMode,
    formData,
    setFormData,
    handleChange,
    handleDateChange,
    handleAvatarChange,
    handleSave,
    handleCancel,
  };
}
