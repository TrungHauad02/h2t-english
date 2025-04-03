import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Topic } from "interfaces";
import { topicService, routeService } from "services";

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
          const resData = await topicService.getTopicById(parseInt(id));
          if (resData.data) {
            setData(resData.data);
            setEditData({ ...resData.data });
          }
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
        const resData = await topicService.updateTopic(editData.id, editData);
        setData(resData.data);
      } catch (error) {
        console.error("Error updating topic");
        // TODO: Display error
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
      // TODO: Check valid lesson before publish
      const resData = await topicService.patchTopic(data.id, {
        status: true,
      });
      setData(resData.data);
      if (editData) setEditData(resData.data);
      setOpenPublishDialog(false);
    }
  };

  const handleUnpublish = async () => {
    if (data) {
      const resData = await topicService.patchTopic(data.id, {
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
