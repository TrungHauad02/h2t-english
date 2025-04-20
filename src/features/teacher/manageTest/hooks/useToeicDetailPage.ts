import { Toeic } from "interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toeicService } from "services/test";
import { usePartHandlers } from "./useToeicDetailPage/usePartHandlers";
import { useQuestionSubTypes } from "./useToeicDetailPage/useQuestionSubTypes";

export default function useToeicDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Toeic | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Toeic | null>(null);
  const [loading, setLoading] = useState(true);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] = useState(false);

  // Hook containing all part-specific data and handlers
  const partHandlers = usePartHandlers(data, setData);
  
  // Hook containing all question sub-types data and handlers
  const questionHandlers = useQuestionSubTypes(data);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const toeic = await toeicService.findById(parseInt(id));
          if (toeic) {
            setData(toeic.data);
            setEditData({ ...toeic.data });
            
            // Load all parts data
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
    // Load all parts data with separated functions
    await Promise.all([
      partHandlers.loadPart1Data(toeic),
      partHandlers.loadPart2Data(toeic),
      partHandlers.loadPart3Data(toeic),
      partHandlers.loadPart4Data(toeic),
      partHandlers.loadPart5Data(toeic),
      partHandlers.loadPart6Data(toeic),
      partHandlers.loadPart7Data(toeic)
    ]);
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
        setIsEditMode(false);
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

  const getTotalQuestions = () => {
    let total = 0;
    
    // Count direct questions (Part 1, 2, 5)
    total += partHandlers.part1Questions.length;
    total += partHandlers.part2Questions.length;
    total += partHandlers.part5Questions.length;
    
    // Count sub-questions (Part 3, 4, 6, 7)
    total += Object.values(questionHandlers.part3ToeicQuestions).reduce((sum, questions) => sum + questions.length, 0);
    total += Object.values(questionHandlers.part4ToeicQuestions).reduce((sum, questions) => sum + questions.length, 0);
    total += Object.values(questionHandlers.part6ToeicQuestions).reduce((sum, questions) => sum + questions.length, 0);
    total += Object.values(questionHandlers.part7ToeicQuestions).reduce((sum, questions) => sum + questions.length, 0);
    
    return total > 0 ? total : 200;
  };

  // Combine all the exported values from both hooks and this one
  // Use destructuring to avoid duplicated properties
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
    getTotalQuestions,

    ...partHandlers,
    
    // Question sub-types handlers
    ...questionHandlers
  };
}