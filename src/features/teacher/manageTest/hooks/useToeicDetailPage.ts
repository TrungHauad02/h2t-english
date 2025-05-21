import { Toeic } from "interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toeicService } from "services/test";
import { useQuestionSubTypes } from "./useToeicDetailsPage/useQuestionSubTypes";
import { usePartHandlers } from "./useToeicDetailsPage/usePartHandlers";

export default function useToeicDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Toeic | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Toeic | null>(null);
  const [loading, setLoading] = useState(true);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] = useState(false);

  const questionHandlers = useQuestionSubTypes(data);

  const partHandlers = usePartHandlers(data, setData, questionHandlers);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const toeic = await toeicService.findById(parseInt(id));
          if (toeic) {
            setData(toeic.data);
            setEditData({ ...toeic.data });

          
            await loadToeicPartsData(toeic.data);
          }
        } catch (e) {
          console.error("Error loading TOEIC test:", e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  const loadToeicPartsData = async (toeic: Toeic) => {
    try {
      await Promise.all([
        partHandlers.loadPart1Data(toeic),
        partHandlers.loadPart2Data(toeic),
        partHandlers.loadPart3Data(toeic),
        partHandlers.loadPart4Data(toeic),
        partHandlers.loadPart5Data(toeic),
        partHandlers.loadPart6Data(toeic),
        partHandlers.loadPart7Data(toeic),
      ]);
    } catch (error) {
      console.error("Error loading TOEIC parts and questions:", error);
    }
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode && data) {
      setEditData({ ...data });
    }
  };

  const handleSaveChanges = async () => {
    if (editData && editData.id) {
      try {
        await toeicService.update(editData.id, editData);
        setData(editData); 
        setIsEditMode(!isEditMode);
      } catch (error) {
        console.error("Error saving TOEIC data:", error);
      }
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handlePublish = async () => {
    if (data && data.id) {
      try {
        await toeicService.patch(data.id, { status: true });
        const updated = { ...data, status: true };
        setData(updated);
        setEditData(updated);
        setOpenPublishDialog(false);
      } catch (error) {
        console.error("Error publishing TOEIC test:", error);
      }
    }
  };

  const handleUnpublish = async () => {
    if (data && data.id) {
      try {
        await toeicService.patch(data.id, { status: false });
        const updated = { ...data, status: false };
        setData(updated);
        setEditData(updated);
        setOpenUnpublishDialog(false);
      } catch (error) {
        console.error("Error unpublishing TOEIC test:", error);
      }
    }
  };

  const handlePublishClick = () => setOpenPublishDialog(true);
  const handleUnpublishClick = () => setOpenUnpublishDialog(true);

  return {
    // Core data
    data,
    isEditMode,
    editData,
    loading,
    openPublishDialog,
    openUnpublishDialog,

    // UI handlers
    handleEditMode,
    handleSaveChanges,
    handleInputChange,
    setOpenPublishDialog,
    setOpenUnpublishDialog,
    handlePublish,
    handleUnpublish,
    handlePublishClick,
    handleUnpublishClick,

    ...partHandlers,

    // Question sub-types handlers
    ...questionHandlers,
  };
}
