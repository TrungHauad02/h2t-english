import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, Tooltip } from "@mui/material";
import { Question } from "interfaces";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { QuestionsList, QuestionEmptyState } from "./questionManagement";
import { questionService, testPartQuestionServiceFactory } from "services";
import { toast } from "react-toastify";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";

interface SpeakingQuestionsPanelProps {
  speakingId: number;
  isEditMode: boolean;
  fetchSpeakings: () => void;
  onAddQuestion: () => void;
  questions: number[];
  hasMadeChanges: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onSaveChanges: () => void;
  onDeleteQuestion: (id: number) => void;
}

export default function SpeakingQuestionsPanel({
  speakingId,
  isEditMode,
  fetchSpeakings,
  onAddQuestion,
  questions,
  hasMadeChanges,
  onMoveUp,
  onMoveDown,
  onSaveChanges,
  onDeleteQuestion,
}: SpeakingQuestionsPanelProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const { showError } = useErrors();
  const questionServiceUpdate =
    testPartQuestionServiceFactory("test-speakings");

  const fetchQuestions = async () => {
    try {
      if (speakingId) {
        const resData = await questionService.findByTestId(
          speakingId,
          "test-speakings"
        );
        setQuestionData(resData.data);
      }
    } catch (error) {
      console.error("Error fetching questions", error);
      showError({
        message: "Error fetching questions",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [speakingId, questions]);

  const handleSaveChanges = async () => {
    try {
      const newQuestions = questionData.map((question) => question.id);
      await questionServiceUpdate.updateQuestions(speakingId, newQuestions);
      toast.success("Questions order saved successfully");
      onSaveChanges();
      fetchQuestions();
      fetchSpeakings();
    } catch (error) {
      showError({
        message: "Error updating questions order",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleUpdateQuestion = async (updatedQuestion: Question) => {
    try {
      await questionService.update(updatedQuestion.id, updatedQuestion);
      toast.success("Question updated successfully");
      fetchQuestions();
    } catch (error) {
      showError({
        message: "Error updating question",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: isDarkMode ? color.teal300 : color.teal600,
            fontWeight: "bold",
            position: "relative",
            pl: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 4,
              height: 24,
              borderRadius: "4px",
              backgroundColor: isDarkMode ? color.teal400 : color.teal500,
            },
          }}
        >
          <DescriptionIcon /> Speaking Questions
        </Typography>

        {isEditMode && (
          <Tooltip title="Add a new question">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddQuestion}
              sx={{
                backgroundColor: isDarkMode
                  ? color.emerald700
                  : color.emerald600,
                color: color.white,
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? color.emerald600
                    : color.emerald500,
                  transform: "translateY(-2px)",
                  boxShadow: isDarkMode
                    ? "0 6px 16px rgba(0, 0, 0, 0.3)"
                    : "0 6px 16px rgba(20, 184, 166, 0.25)",
                },
                transition: "all 0.2s ease",
                borderRadius: "0.75rem",
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
                py: 1,
              }}
            >
              Add Question
            </Button>
          </Tooltip>
        )}
      </Box>

      <Paper
        elevation={3}
        sx={{
          borderRadius: "1rem",
          overflow: "hidden",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          border: isDarkMode ? `1px solid ${color.gray700}` : "none",
        }}
      >
        {hasMadeChanges && isEditMode && (
          <Box
            sx={{
              p: 2,
              backgroundColor: isDarkMode ? color.teal800 : color.teal50,
              borderBottom: `1px solid ${
                isDarkMode ? color.teal700 : color.teal200
              }`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.teal200 : color.teal800 }}
            >
              You've changed the order of questions. Remember to save your
              changes.
            </Typography>

            <Button
              variant="contained"
              size="small"
              onClick={handleSaveChanges}
              sx={{
                backgroundColor: isDarkMode ? color.teal600 : color.teal500,
                color: "white",
                "&:hover": {
                  backgroundColor: isDarkMode ? color.teal500 : color.teal400,
                },
                borderRadius: "0.5rem",
                textTransform: "none",
              }}
            >
              Save Order
            </Button>
          </Box>
        )}

        {questions && questions.length > 0 ? (
          <QuestionsList
            questions={questions}
            questionData={questionData}
            isEditMode={isEditMode}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onDelete={onDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
        ) : (
          <QuestionEmptyState
            isEditMode={isEditMode}
            onAddQuestion={onAddQuestion}
          />
        )}
      </Paper>
    </Box>
  );
}
