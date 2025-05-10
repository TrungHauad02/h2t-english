import useAuth from "hooks/useAuth";
import { User } from "interfaces";
import { useEffect, useState } from "react";
import { userService } from "services";

// TODO: Fix format date
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

  const handleSave = () => {
    if (formData) {
      setData(formData);
      // TODO: Connect Api
      // Here you would normally call an API to save the data
      setIsEditMode(false);
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
