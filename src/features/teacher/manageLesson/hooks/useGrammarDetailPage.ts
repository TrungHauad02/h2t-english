import { Grammar } from "interfaces";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listLessonService } from "../services/listLessonService";

export default function useGrammarDetailPage() {
  const { id, routeId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Grammar | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Grammar | null>(null);
  const [loading, setLoading] = useState(true);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] =
    useState<boolean>(false);

  useEffect(() => {
    if (id && routeId) {
      setLoading(true);
      setTimeout(() => {
        const grammar = listLessonService.getGrammarById(parseInt(id));
        if (grammar) {
          setData(grammar);
          setEditData({ ...grammar });
        }
        setLoading(false);
      }, 500);
    }
  }, [id, routeId]);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setEditData({ ...data } as Grammar);
    }
  };

  const handleSaveChanges = () => {
    if (editData) {
      setData(editData);
      setIsEditMode(false);
      // TODO: Update in db
    }
  };

  const handleInputChange = (field: keyof Grammar, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handleDocumentChange = (base64: string) => {
    if (editData) {
      handleInputChange("file", base64);
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

  const handleGoBack = () => {
    navigate(-1);
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
    handleGoBack,
    setOpenPublishDialog,
    setOpenUnpublishDialog,
    handlePublish,
    handleUnpublish,
    handlePublishClick,
    handleUnpublishClick,
    handleDocumentChange,
  };
}
