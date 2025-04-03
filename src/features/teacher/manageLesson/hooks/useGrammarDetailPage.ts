import { Grammar } from "interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { routeService, grammarService } from "services";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";

export default function useGrammarDetailPage() {
  const { id, routeId } = useParams();
  const [data, setData] = useState<Grammar | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Grammar | null>(null);
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
          const resData = await grammarService.getGrammarById(parseInt(id));
          if (resData.data) {
            setData(resData.data);
            setEditData({ ...resData.data });
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
    fetchData();
  }, [id, routeId]);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setEditData({ ...data } as Grammar);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (editData) {
        const resData = await grammarService.updateGrammar(
          editData.id,
          editData
        );
        setData(resData.data);
      }
    } catch (error) {
      console.error("Error updating grammar");
      // Display error
      showError({
        message: "Error updating grammar",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsEditMode(false);
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

  const handlePublish = async () => {
    try {
      if (data) {
        // TODO: Check valid lesson before publish
        const resData = await grammarService.patchGrammar(data.id, {
          status: true,
        });
        setData(resData.data);
        if (editData) setEditData(resData.data);
        setOpenPublishDialog(false);
      }
    } catch (error) {
      console.error("Error publishing grammar");
      // Display error
      showError({
        message: "Error publishing grammar",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleUnpublish = async () => {
    try {
      if (data) {
        const resData = await grammarService.patchGrammar(data.id, {
          status: false,
        });
        setData(resData.data);
        if (editData) setEditData(resData.data);
        setOpenUnpublishDialog(false);
      }
    } catch (error) {
      console.error("Error unPublishing grammar");
      // Display error
      showError({
        message: "Error unPublishing grammar",
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
  };
}
