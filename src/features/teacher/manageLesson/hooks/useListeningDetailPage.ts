import { Listening } from "interfaces";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listeningService, routeService } from "services";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { useErrors } from "hooks/useErrors";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";

export default function useListeningDetailPage() {
  const { id, routeId } = useParams();
  const [data, setData] = useState<Listening | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Listening | null>(null);
  const [loading, setLoading] = useState(true);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] =
    useState<boolean>(false);
  const { showError } = useErrors();
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id, routeId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (id && routeId) {
        //  Check owner id using routeId
        const resRouteData = await routeService.findById(parseInt(routeId));
        if (resRouteData.data) {
          if (resRouteData.data.ownerId.toString() !== userId) {
            // Display error
            toast.error("You don't have permission to this resource");
            setLoading(false);
            navigate(-1);
            return;
          }
        }
        const resData = await listeningService.findById(parseInt(id));
        let lessonData = { ...resData.data };
        if (resData.data) {
          if (resData.data.status) {
            const verifyData = await listeningService.verify(parseInt(id));
            if (verifyData.status === "FAIL") {
              await listeningService.patch(parseInt(id), {
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
        message: "Error fetching listening",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setEditData({ ...data } as Listening);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (editData) {
        const resData = await listeningService.patch(editData.id, editData);
        setData(resData.data);
      }
    } catch (error) {
      console.error("Error updating listening");
      // Display error
      showError({
        message: "Error updating listening",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsEditMode(false);
    }
  };

  const handleInputChange = (field: keyof Listening, value: any) => {
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
        // Check valid lesson before publish
        const verifyData = await listeningService.verify(data.id);
        if (verifyData.status === "FAIL") {
          toast.error(verifyData.message);
          setOpenPublishDialog(false);
          return;
        }
        const resData = await listeningService.patch(data.id, {
          status: true,
        });
        setData(resData.data);
        if (editData) setEditData(resData.data);
        setOpenPublishDialog(false);
        toast.success("Listening published successfully");
      }
    } catch (error) {
      console.error("Error publishing listening");
      // Display error
      showError({
        message: "Error publishing listening",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleUnpublish = async () => {
    try {
      if (data) {
        const resData = await listeningService.patch(data.id, {
          status: false,
        });
        setData(resData.data);
        if (editData) setEditData(resData.data);
        setOpenUnpublishDialog(false);
      }
    } catch (error) {
      console.error("Error unPublishing listening");
      // Display error
      showError({
        message: "Error unPublishing listening",
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
    fetchData,
  };
}
