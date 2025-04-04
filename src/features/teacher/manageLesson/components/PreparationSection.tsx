import { Box, Divider, Paper, CircularProgress } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import QuizIcon from "@mui/icons-material/Quiz";
import SectionHeader from "./common/SectionHeader";
import { useEffect, useState } from "react";
import {
  ClassifySection,
  MatchWordWithSentenceSection,
  WordsMakeSentencesSection,
  PreparationDetailsView,
  PreparationEditForm,
} from "./preparation";
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

interface PreparationSectionProps {
  preparationId: number | null;
  type: "readings" | "speakings" | "listenings" | "writings";
}

export default function PreparationSection({
  preparationId,
  type,
}: PreparationSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
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

  // Show loading state
  if (isLoading) {
    return (
      <Box
        component={Paper}
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
          }}
        />
      </Box>
    );
  }

  if (!data) {
    return <></>;
  }

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        mt: 4,
        position: "relative",
      }}
    >
      {isSaving && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            borderRadius: "1rem",
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
            }}
          />
        </Box>
      )}

      <SectionHeader
        icon={<QuizIcon />}
        title={preparationId ? "Preparation Section" : "New Preparation"}
        isEditMode={isEditMode}
        handleSaveChanges={handleSaveChanges}
        handleEditMode={handleEditMode}
        handleCancelEdit={handleCancelEdit}
      />

      {isEditMode ? (
        <PreparationEditForm
          editData={editData}
          handleInputChange={handleInputChange}
        />
      ) : (
        <PreparationDetailsView data={data} />
      )}

      <Divider />
      {renderPreparation()}
    </Box>
  );
}
