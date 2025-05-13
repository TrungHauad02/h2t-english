import useAuth from "hooks/useAuth";
import { User } from "interfaces";
import { useEffect, useState } from "react";
import { userService } from "services";

export default function useStudentProfile() {
  const { userId } = useAuth();
  const [data, setData] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (userId) {
          const resData = await userService.findById(parseInt(userId));
          setData(resData.data);
          setFormData(resData.data);
        }
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      if (e.target.name === "phoneNumber") {
        if (e.target.value.length > 10 || /[a-zA-Z]/.test(e.target.value)) {
          return;
        }
      }
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
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
        setFormData(resData.data);
      } catch (error) {
        console.error("Error updating data:", error);
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
