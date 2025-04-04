import { useEffect, useState } from "react";
import {
  ClassifySection,
  MatchWordWithSentenceSection,
  WordsMakeSentencesSection,
} from "../components/preparation";
import { Preparation, PreparationType } from "interfaces";
import {
  listeningService,
  preparationService,
  readingService,
  speakingService,
  writingService,
} from "services";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";

export default function usePreparationSection(
  preparationId: number | null,
  type: "readings" | "speakings" | "listenings" | "writings"
) {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [data, setData] = useState<Preparation | null>(null);
  const [editData, setEditData] = useState<Preparation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { showError } = useErrors();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (preparationId) {
          const resData = await preparationService.findById(preparationId);
          if (resData.data) {
            setData(resData.data);
            setEditData({ ...resData.data });
          }
        } else {
          // Create initial data for new preparation
          const initialData: Preparation = {
            id: 0,
            title: "",
            tip: "",
            questions: [],
            type: PreparationType.MATCH_WORD_WITH_SENTENCES,
            status: false,
          };
          setData(initialData);
          setEditData({ ...initialData });
          setIsEditMode(true); // Automatically enter edit mode for new preparation
        }
      } catch (error) {
        toast.error("Error fetching preparation data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [preparationId]);

  const handleInputChange = (field: keyof Preparation, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (!editData) return;

    try {
      setIsSaving(true);
      let response;

      if (preparationId) {
        // Update existing preparation
        response = await preparationService.update(preparationId, editData);
      } else {
        // Create new preparation
        response = await preparationService.create(editData);
        switch (type) {
          case "readings":
            await readingService.patch(parseInt(id || ""), {
              preparationId: response.data.id,
            });
            break;
          case "speakings":
            await speakingService.patch(parseInt(id || ""), {
              preparationId: response.data.id,
            });
            break;
          case "listenings":
            await listeningService.patch(parseInt(id || ""), {
              preparationId: response.data.id,
            });
            break;
          case "writings":
            await writingService.patch(parseInt(id || ""), {
              preparationId: response.data.id,
            });
            break;
        }
      }

      if (response.data) {
        setData(response.data);
        setEditData(response.data);
        setIsEditMode(false);
        toast.success(
          preparationId
            ? "Preparation updated successfully"
            : "Preparation created successfully"
        );
      }
    } catch (error) {
      showError({
        message: "Error saving changes",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditMode = () => {
    setEditData(data);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    if (!preparationId && data?.id === 0) {
      setIsEditMode(true);
      toast.warning("Please save changes before leaving");
      return;
    }
    setEditData(data);
    setIsEditMode(false);
  };

  const renderPreparation = () => {
    const currentData = isEditMode ? editData : data;
    if (!currentData) return null;

    switch (currentData.type) {
      case PreparationType.MATCH_WORD_WITH_SENTENCES:
        return (
          <MatchWordWithSentenceSection questions={currentData.questions} />
        );
      case PreparationType.CLASSIFY:
        return <ClassifySection questions={currentData.questions} />;
      case PreparationType.WORDS_MAKE_SENTENCES:
        return <WordsMakeSentencesSection questions={currentData.questions} />;
      default:
        return <></>;
    }
  };

  return {
    data,
    editData,
    isEditMode,
    isSaving,
    isLoading,
    setIsEditMode,
    setData,
    setEditData,
    setIsLoading,
    setIsSaving,
    handleInputChange,
    handleSaveChanges,
    handleEditMode,
    handleCancelEdit,
    renderPreparation,
  };
}
