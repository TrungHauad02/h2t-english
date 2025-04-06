import { Writing } from "interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { writingService, routeService } from "services";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { useErrors } from "hooks/useErrors";

export default function useWritingDetailPage() {
  const { id, routeId } = useParams();
  const [data, setData] = useState<Writing | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Writing | null>(null);
  const [loading, setLoading] = useState(true);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] =
    useState<boolean>(false);
  const { showError } = useErrors();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id && routeId) {
          //  Check owner id using routeId
          const resRouteData = await routeService.getRouteById(
            parseInt(routeId)
          );
          if (resRouteData.data) {
            if (resRouteData.data.ownerId !== 1) {
              // TODO: Check with real teacher ID
              // TODO: Display error
              return;
            }
          }
          const resData = await writingService.findById(parseInt(id));
          if (resData.data) {
            setData(resData.data);
            setEditData({ ...resData.data });
          }
          setLoading(false);
        }
      } catch (error) {
        // Display error
        showError({
          message: "Error fetching writing",
          severity: "error",
          details: extractErrorMessages(error),
        });
      }
    };
    fetchData();
  }, [id, routeId]);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setEditData({ ...data } as Writing);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (editData) {
        const resData = await writingService.update(editData.id, editData);
        setData(resData.data);
      }
    } catch (error) {
      console.error("Error updating writing");
      // Display error
      showError({
        message: "Error updating writing",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsEditMode(false);
    }
  };

  const handleInputChange = (field: keyof Writing, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handlePublish = async () => {
    try {
      if (data) {
        // TODO: Check valid lesson before publish
        const resData = await writingService.patch(data.id, {
          status: true,
        });
        setData(resData.data);
        if (editData) setEditData(resData.data);
        setOpenPublishDialog(false);
      }
    } catch (error) {
      console.error("Error publishing writing");
      // Display error
      showError({
        message: "Error publishing writing",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleUnpublish = async () => {
    try {
      if (data) {
        const resData = await writingService.patch(data.id, {
          status: false,
        });
        setData(resData.data);
        if (editData) setEditData(resData.data);
        setOpenUnpublishDialog(false);
      }
    } catch (error) {
      console.error("Error unPublishing writing");
      // Display error
      showError({
        message: "Error unPublishing writing",
        severity: "error",
        details: extractErrorMessages(error),
      });
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
