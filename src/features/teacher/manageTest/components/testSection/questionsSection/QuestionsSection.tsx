import { Box, Button, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import NoQuestionSection from "./NoQuestionSection";
import ListQuestion from "./ListQuestion";
import { useEffect, useState } from "react";
import { Question, QuestionSupportTestType } from "interfaces";
import { questionService, testPartQuestionServiceFactory } from "services";
import AddQuestionDialog from "./AddQuestionDialog";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from "@mui/icons-material/Add";
import SectionHeader from "../common/SectionHeader";
import { toast } from "react-toastify";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";

interface QuestionsSectionProps {
  questions: number[];
  type: QuestionSupportTestType;
  parentId: number;
}

export default function QuestionsSection({
  questions,
  type,
  parentId,
}: QuestionsSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const [listQuestionId, setListQuestionId] = useState(questions);
  const [data, setData] = useState<Question[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showError } = useErrors();


  const questionServiceUpdate = testPartQuestionServiceFactory((type));

  const fetchData = async () => {
    try {
      if (parentId) {
      
        const resData = await questionService.findByTestId(parentId,type)
        console.log(resData);
        setData(resData.data);
        const newQuestionIds = resData.data.map((question: Question) => question.id);
        setListQuestionId(newQuestionIds);
      }
    } catch (error) {
      console.error("Error fetching topics");
    }
  };
  useEffect(() => {
    fetchData();
  }, [type, parentId]);

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

      await questionServiceUpdate.updateQuestions(parentId, newQuestions);
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
        questions={listQuestionId}
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        partId={parentId | 0}
        fetchData={fetchData}
      />
    </Box>
  );
}
