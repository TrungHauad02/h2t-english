import { useEffect, useState, useCallback } from "react";
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
import { getPreparationDefaults } from "../utils/preparationDefaults";

const LESSON_SERVICES = {
  readings: readingService,
  speakings: speakingService,
  listenings: listeningService,
  writings: writingService,
};

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

  const lessonId = parseInt(id || "0");
  const lessonService = LESSON_SERVICES[type];

  // Create initial preparation data
  const createInitialData = useCallback(() => {
    const defaults = getPreparationDefaults(
      PreparationType.MATCH_WORD_WITH_SENTENCES
    );
    const initialData: Preparation = {
      id: 0,
      title: defaults.title,
      tip: defaults.tip,
      questions: [],
      type: PreparationType.MATCH_WORD_WITH_SENTENCES,
      status: false,
    };
    setData(initialData);
    setEditData({ ...initialData });
    setIsEditMode(true);
  }, []);

  // Fetch preparation data
  const fetchData = async () => {
    try {
      setIsLoading(true);

      if (preparationId) {
        // Existing preparation
        const resData = await preparationService.findById(preparationId);
        if (resData.data) {
          setData(resData.data);
          setEditData({ ...resData.data });
        }
      } else if (data && data.id > 0) {
        // Recently created preparation
        const resData = await preparationService.findById(data.id);
        if (resData.data) {
          setData(resData.data);
          setEditData({ ...resData.data });
        }
      } else {
        // New preparation
        createInitialData();
        return;
      }
    } catch (error) {
      toast.error("Error fetching preparation data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [preparationId]);

  const handleInputChange = (field: keyof Preparation, value: any) => {
    if (editData) {
      let updatedData = {
        ...editData,
        [field]: value,
      };

      // If changing type, update title and tip with defaults
      if (field === "type") {
        const defaults = getPreparationDefaults(value as PreparationType);
        updatedData = {
          ...updatedData,
          title: defaults.title,
          tip: defaults.tip,
        };
      }

      setEditData(updatedData);
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

        // Link the new preparation to the lesson
        if (response.data?.id && lessonId) {
          await lessonService.patch(lessonId, {
            preparationId: response.data.id,
          });
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
    if (isEditMode || !data) return null;

    const sectionProps = {
      questions: data.questions,
      preparationId: data.id,
      fetchPreparationData: fetchData,
    };

    switch (data.type) {
      case PreparationType.MATCH_WORD_WITH_SENTENCES:
        return <MatchWordWithSentenceSection {...sectionProps} />;
      case PreparationType.CLASSIFY:
        return <ClassifySection {...sectionProps} />;
      case PreparationType.WORDS_MAKE_SENTENCES:
        return <WordsMakeSentencesSection {...sectionProps} />;
      default:
        return null;
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
