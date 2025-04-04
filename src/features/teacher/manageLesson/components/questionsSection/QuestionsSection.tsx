import { Box, Button, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import NoQuestionSection from "./NoQuestionSection";
import ListQuestion from "./ListQuestion";
import { useEffect, useState } from "react";
import { LessonQuestion, QuestionSupportType } from "interfaces";
import { aqService, questionServiceFactory } from "services";
import AddQuestionDialog from "./AddQuestionDialog";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import { toast } from "react-toastify";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";

interface QuestionsSectionProps {
  questions: number[];
  type: QuestionSupportType;
}

export default function QuestionsSection({
  questions,
  type,
}: QuestionsSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  const { id } = useParams();
  const [data, setData] = useState<LessonQuestion[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showError } = useErrors();

  const questionService = questionServiceFactory(type);

  const fetchData = async () => {
    try {
      if (id) {
        const resData = await aqService.findByLessonId(parseInt(id), type);
        console.log(resData);
        setData(resData.data);
      }
    } catch (error) {
      console.error("Error fetching topics");
    }
  };
  useEffect(() => {
    fetchData();
  }, [type, id]);

  const handleAddQuestion = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = async () => {
    // Save serial change
    try {
      const newQuestions = data.map((question) => question.id);
      const lessonId = id ? parseInt(id) : 0;

      await questionService.updateQuestions(lessonId, newQuestions);
      toast.success("Questions updated successfully");
    } catch (error) {
      // TODO: Display error
      showError({
        message: "Error updating questions",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
    setIsEditMode(false);
    fetchData();
  };

  const onMoveUp = (index: number) => {
    if (index <= 0) return;
    const updatedData = [...data];
    [updatedData[index], updatedData[index - 1]] = [
      updatedData[index - 1],
      updatedData[index],
    ];
    setData(updatedData);
  };

  const onMoveDown = (index: number) => {
    if (index >= data.length - 1) return;
    const updatedData = [...data];
    [updatedData[index], updatedData[index + 1]] = [
      updatedData[index + 1],
      updatedData[index],
    ];
    setData(updatedData);
  };

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
        title={`Questions (${data.length})`}
        editText="Edit"
        icon={<QuizIcon />}
        isEditMode={isEditMode}
        handleEditMode={handleEditMode}
        handleCancelEdit={handleEditMode}
        handleSaveChanges={handleSaveChanges}
      />
      {isEditMode && (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddQuestion}
            sx={{
              bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
              color: "white",
              "&:hover": {
                bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
              },
            }}
          >
            Add Question
          </Button>
        </Box>
      )}
      {data.length > 0 ? (
        <ListQuestion
          data={data}
          isEditMode={isEditMode}
          fetchData={fetchData}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          type={type}
          questions={questions}
        />
      ) : (
        <NoQuestionSection secondaryTextColor={secondaryTextColor} />
      )}

      <AddQuestionDialog
        type={type}
        questions={questions}
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        lessonId={id ? parseInt(id) : 0}
        fetchData={fetchData}
      />
    </Box>
  );
}
