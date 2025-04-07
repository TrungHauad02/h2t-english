import { Reading } from "interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readingService, routeService } from "services";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { useErrors } from "hooks/useErrors";
import { toast } from "react-toastify";

export default function useReadingDetailPage() {
  const { id, routeId } = useParams();
  const [data, setData] = useState<Reading | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(true);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] =
    useState<boolean>(false);
  const { showError } = useErrors();

  useEffect(() => {
    fetchData();
  }, [id, routeId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (id && routeId) {
        //  Check owner id using routeId
        const resRouteData = await routeService.getRouteById(parseInt(routeId));
        if (resRouteData.data) {
          if (resRouteData.data.ownerId !== 1) {
            // TODO: Check with real teacher ID
            // TODO: Display error
            return;
          }
        }
        const resData = await readingService.findById(parseInt(id));
        let lessonData = { ...resData.data };
        if (resData.data) {
          if (resData.data.status) {
            const verifyData = await readingService.verify(parseInt(id));
            if (verifyData.status === "FAIL") {
              await readingService.patch(parseInt(id), {
                status: false,
              });
              toast.warning(
                "Due to verify fail, this lesson has been changed to unpublish"
              );
              lessonData.status = false;
            }
          }
          setData(lessonData);
          setEditData({ ...lessonData });
        }
        setLoading(false);
      }
    } catch (error) {
      // Display error
      showError({
        message: "Error fetching grammar",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setEditData({ ...data } as Reading);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (editData) {
        const resData = await readingService.update(editData.id, editData);
        setData(resData.data);
      }
    } catch (error) {
      console.error("Error updating reading");
      // Display error
      showError({
        message: "Error updating reading",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsEditMode(false);
    }
  };

  const handleInputChange = (field: keyof Reading, value: any) => {
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

  const handlePublish = async () => {
    try {
      if (data) {
        // Check valid lesson before publish
        const verifyData = await readingService.verify(data.id);
        if (verifyData.status === "FAIL") {
          toast.error(verifyData.message);
          setOpenPublishDialog(false);
          return;
        }
        const resData = await readingService.patch(data.id, {
          status: true,
        });
        setData(resData.data);
        if (editData) setEditData(resData.data);
        setOpenPublishDialog(false);
        toast.success("Reading published successfully");
      }
    } catch (error) {
      console.error("Error publishing reading");
      // Display error
      showError({
        message: "Error publishing reading",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleUnpublish = async () => {
    try {
      if (data) {
        const resData = await readingService.patch(data.id, {
          status: false,
        });
        setData(resData.data);
        if (editData) setEditData(resData.data);
        setOpenUnpublishDialog(false);
      }
    } catch (error) {
      console.error("Error unPublishing reading");
      // Display error
      showError({
        message: "Error unPublishing reading",
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
    handleDocumentChange,
    fetchData,
  };
}
