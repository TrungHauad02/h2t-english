import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LessonQuestion, LessonAnswer } from "interfaces";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface QuestionEditModeProps {
  editData: LessonQuestion;
  setEditData: (data: LessonQuestion) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

export function QuestionEditMode({
  editData,
  setEditData,
  handleSave,
  handleCancel,
}: QuestionEditModeProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const handleQuestionChange = (field: keyof LessonQuestion, value: any) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleAnswerChange = (
    index: number,
    field: keyof LessonAnswer,
    value: any
  ) => {
    const newAnswers = [...editData.answers];
    newAnswers[index] = { ...newAnswers[index], [field]: value };
    setEditData({ ...editData, answers: newAnswers });
  };

  const addNewAnswer = () => {
    const newAnswer: LessonAnswer = {
      id: Date.now(),
      content: "",
      correct: false,
      questionId: editData.id,
      status: true,
    };
    setEditData({ ...editData, answers: [...editData.answers, newAnswer] });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = [...editData.answers];
    newAnswers.splice(index, 1);
    setEditData({ ...editData, answers: newAnswers });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          bgcolor: cardBgColor,
          borderRadius: 3,
          p: 3,
          border: `1px solid ${borderColor}`,
          mb: 3,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="medium"
          color={accentColor}
          sx={{ mb: 2 }}
        >
          Question Details
        </Typography>

        <TextField
          fullWidth
          label="Question Content"
          value={editData?.content || ""}
          onChange={(e) => handleQuestionChange("content", e.target.value)}
          multiline
          rows={3}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <TextField
          fullWidth
          label="Explanation"
          value={editData?.explanation || ""}
          onChange={(e) => handleQuestionChange("explanation", e.target.value)}
          multiline
          rows={2}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Box
        sx={{
          bgcolor: cardBgColor,
          borderRadius: 3,
          p: 3,
          border: `1px solid ${borderColor}`,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color={accentColor}
          >
            Answers
          </Typography>

          <Button
            startIcon={<AddCircleIcon />}
            onClick={addNewAnswer}
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
            }}
          >
            Add Answer
          </Button>
        </Box>

        <Stack spacing={2}>
          {editData?.answers.map((answer, index) => (
            <Box
              key={answer.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: isDarkMode ? color.gray600 : color.gray100,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label={`Answer ${index + 1}`}
                  value={answer.content}
                  onChange={(e) =>
                    handleAnswerChange(index, "content", e.target.value)
                  }
                  sx={{
                    mb: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={answer.correct}
                      onChange={(e) =>
                        handleAnswerChange(index, "correct", e.target.checked)
                      }
                      sx={{
                        color: isDarkMode ? color.emerald400 : color.emerald600,
                        "&.Mui-checked": {
                          color: isDarkMode
                            ? color.emerald400
                            : color.emerald600,
                        },
                      }}
                    />
                  }
                  label="Correct Answer"
                />
              </Box>
              <IconButton
                onClick={() => removeAnswer(index)}
                sx={{
                  color: isDarkMode ? color.red400 : color.red600,
                  mt: 1,
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: isDarkMode ? color.emerald400 : color.emerald600,
            color: "white",
            "&:hover": {
              backgroundColor: isDarkMode ? color.emerald500 : color.emerald700,
            },
            mr: 2,
          }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            borderColor: isDarkMode ? color.gray400 : color.gray500,
            color: isDarkMode ? color.gray400 : color.gray500,
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
