import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Topic } from "interfaces";
import { listLessonService } from "../services/listLessonService";

export default function useTopicDetailPage() {
  const { id, routeId } = useParams();
  const [data, setData] = useState<Topic | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] =
    useState<boolean>(false);

  useEffect(() => {
    if (id && routeId) {
      setLoading(true);
      setTimeout(() => {
        const topic = listLessonService.getTopicById(parseInt(id));
        if (topic) {
          setData(topic);
          setEditData({ ...topic });
        }
        setLoading(false);
      }, 500);
    }
  }, [id, routeId]);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setEditData({ ...data } as Topic);
    }
  };

  const handleSaveChanges = () => {
    if (editData) {
      setData(editData);
      setIsEditMode(false);
      // TODO: Update in db
    }
  };

  const handleInputChange = (field: keyof Topic, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handlePublish = () => {
    if (data) {
      const updatedData = { ...data, status: true };
      setData(updatedData);
      // TODO: Update in db
      if (editData) setEditData(updatedData);
      setOpenPublishDialog(false);
    }
  };

  const handleUnpublish = () => {
    if (data) {
      const updatedData = { ...data, status: false };
      setData(updatedData);
      // TODO: Update in db
      if (editData) setEditData(updatedData);
      setOpenUnpublishDialog(false);
    }
  };

  const handlePublishClick = () => {
    setOpenPublishDialog(true);
  };

  const handleUnpublishClick = () => {
    setOpenUnpublishDialog(true);
  };

  return {
    data,
    isEditMode,
    editData,
    loading,
    openPublishDialog,
    openUnpublishDialog,
    handleEditMode,
    handleSaveChanges,
    handleInputChange,
    setOpenPublishDialog,
    setOpenUnpublishDialog,
    handlePublish,
    handleUnpublish,
    handlePublishClick,
    handleUnpublishClick,
  };
}
