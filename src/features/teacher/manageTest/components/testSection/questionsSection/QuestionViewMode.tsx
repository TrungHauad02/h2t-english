import {
  Box,
  Typography,
  IconButton,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import { Question } from "interfaces";
import useColor from "theme/useColor";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDarkMode } from "hooks/useDarkMode";
import DeleteIcon from "@mui/icons-material/Delete";

interface QuestionViewModeProps {
  question: Question;
  handleEdit: (questionId: number) => void;
}

export function QuestionViewMode({
  question,
  handleEdit,
}: QuestionViewModeProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Box>
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 1,
            }}
          >
            <Chip
              // label={`Question ${question.serial}`}
              sx={{
                bgcolor: isDarkMode ? color.teal700 : color.teal100,
                color: isDarkMode ? color.white : color.teal800,
                fontWeight: "bold",
                borderRadius: 1.5,
              }}
            />
            <Chip
              icon={question.status ? <CheckCircleIcon /> : <CancelIcon />}
              label={question.status ? "Active" : "Inactive"}
              color={question.status ? "success" : "error"}
              size="small"
              sx={{
                bgcolor: question.status
                  ? isDarkMode
                    ? color.emerald700
                    : color.emerald600
                  : isDarkMode
                  ? color.red700
                  : color.red600,
                color: color.white,
                "& .MuiChip-icon": {
                  color: color.white,
                },
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "medium",
              color: isDarkMode ? color.white : color.gray900,
              mb: 1,
            }}
          >
            {question.content}
          </Typography>
          {question.explanation && (
            <Typography
              variant="body2"
              sx={{
                color: secondaryTextColor,
                fontStyle: "italic",
              }}
            >
              Explanation: {question.explanation}
            </Typography>
          )}
        </Box>
        <Stack direction={"row"} spacing={2}>
          <IconButton
            onClick={() => handleEdit(question.id)}
            sx={{
              color: isDarkMode ? color.red400 : color.red600,
              mt: 1,
              bgcolor: isDarkMode ? color.gray600 : color.gray100,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray500 : color.gray300,
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => handleEdit(question.id)}
            sx={{
              color: accentColor,
              bgcolor: isDarkMode ? color.gray600 : color.gray100,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray500 : color.gray300,
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Stack>
      </Box>

      <Divider
        sx={{ borderColor: isDarkMode ? color.gray600 : color.gray300 }}
      />

      <Box sx={{ p: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: secondaryTextColor,
            mb: 2,
            fontWeight: "medium",
          }}
        >
          Answer Options
        </Typography>
        <Stack spacing={1.5}>
          {question.answers.map((answer) => (
            <Box
              key={answer.id}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: isDarkMode ? color.gray700 : color.gray100,
                border: answer.correct
                  ? `1px solid ${
                      isDarkMode ? color.emerald400 : color.emerald600
                    }`
                  : "none",
              }}
            >
              {answer.correct && (
                <CheckCircleIcon
                  sx={{
                    color: isDarkMode ? color.emerald400 : color.emerald600,
                    mr: 2,
                  }}
                />
              )}
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: isDarkMode ? color.white : color.gray900,
                    fontWeight: answer.correct ? "medium" : "regular",
                  }}
                >
                  {answer.content}
                </Typography>
                <Chip
                  label={answer.status ? "Active" : "Inactive"}
                  color={answer.status ? "success" : "error"}
                  size="small"
                  sx={{
                    bgcolor: answer.status
                      ? isDarkMode
                        ? color.emerald700
                        : color.emerald600
                      : isDarkMode
                      ? color.red700
                      : color.red600,
                    color: color.white,
                  }}
                />
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
