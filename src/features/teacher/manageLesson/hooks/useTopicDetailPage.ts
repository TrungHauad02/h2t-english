import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Topic } from "interfaces";
import { topicService, routeService } from "services";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";

export default function useTopicDetailPage() {
  const { id, routeId } = useParams();
  const [data, setData] = useState<Topic | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] =
    useState<boolean>(false);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id && routeId) {
          //  Check owner id using routeId
          const resRouteData = await routeService.findById(parseInt(routeId));
          if (resRouteData.data) {
            if (resRouteData.data.ownerId !== userId) {
              // Display error
              toast.error("You don't have permission to this resource");
              setLoading(false);
              navigate(-1);
              return;
            }
          }
          const resData = await topicService.findById(parseInt(id));
          let lessonData = { ...resData.data };
          if (resData.data) {
            if (resData.data.status) {
              const verifyData = await topicService.verify(parseInt(id));
              if (verifyData.status === "FAIL") {
                await topicService.patch(parseInt(id), {
                  status: false,
                });
                toast.warning(
                  "Due to verify fail, this lesson has been changed to unpublish"
                );
                lessonData.status = false;
              }
            }
          }

          setData(lessonData);
          setEditData({ ...lessonData });
        }
      } catch (error) {
        console.error("Error fetching topic");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, routeId]);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setEditData({ ...data } as Topic);
    }
  };

  const handleSaveChanges = async () => {
    if (editData) {
      setData(editData);
      setIsEditMode(false);
      // Update in db
      try {
        const resData = await topicService.update(editData.id, editData);
        setData(resData.data);
      } catch (error) {
        console.error("Error updating topic");
        // Display error
        toast.error("Error updating topic");
      }
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

  const handlePublish = async () => {
    if (data) {
      // Check valid lesson before publish
      const verifyData = await topicService.verify(data.id);
      if (verifyData.status === "FAIL") {
        toast.error(verifyData.message);
        setOpenPublishDialog(false);
        return;
      }
      const resData = await topicService.patch(data.id, {
        status: true,
      });
      setData(resData.data);
      if (editData) setEditData(resData.data);
      setOpenPublishDialog(false);
      toast.success("Topic published successfully");
    }
  };

  const handleUnpublish = async () => {
    if (data) {
      const resData = await topicService.patch(data.id, {
        status: false,
      });
      setData(resData.data);
      if (editData) setEditData(resData.data);
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
