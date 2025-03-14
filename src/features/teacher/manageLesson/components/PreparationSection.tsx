import { Box, Divider, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import QuizIcon from "@mui/icons-material/Quiz";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";
import {
  ClassifySection,
  MatchWordWithSentenceSection,
  WordsMakeSentencesSection,
} from "./preparation";
import { Preparation, PreparationType } from "interfaces";
import PreparationDetailsView from "./preparation/PreparationDetailsView";
import PreparationEditForm from "./preparation/PreparationEditForm";

export default function PreparationSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [data, setData] = useState<Preparation | null>(null);
  const [editData, setEditData] = useState<Preparation | null>(null);

  useEffect(() => {
    // TODO: Fetch data (example initialization)
    const initialData = {
      id: 1,
      status: true,
      title: "Preparation 1",
      tip: "This is tip for studying",
      type: PreparationType.MATCH_WORD_WITH_SENTENCES,
      questions: [1, 2, 3],
    };
    setData(initialData);
    setEditData(initialData);
  }, []);

  const handleInputChange = (field: keyof Preparation, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handleSaveChanges = () => {
    // TODO: Save data to backend
    setData(editData);
    setIsEditMode(false);
  };

  const handleEditMode = () => {
    setEditData(data);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditData(data);
    setIsEditMode(false);
  };

  const renderPreparation = () => {
    const currentData = isEditMode ? editData : data;

    switch (currentData?.type) {
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
      }}
    >
      <SectionHeader
        icon={<QuizIcon />}
        title="Preparation Section"
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
