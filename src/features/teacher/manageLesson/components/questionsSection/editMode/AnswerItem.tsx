import {
  Box,
  Stack,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { LessonAnswer } from "interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface AnswerItemProps {
  answer: LessonAnswer;
  index: number;
  handleAnswerChange: (
    index: number,
    field: keyof LessonAnswer,
    value: any
  ) => void;
  handleRemoveAnswer: (index: number) => void;
  accentColor: string;
}

export default function AnswerItem({
  answer,
  index,
  handleAnswerChange,
  handleRemoveAnswer,
  accentColor,
}: AnswerItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        px: 2,
        py: 0.5,
        borderRadius: 2,
        bgcolor: isDarkMode ? color.gray600 : color.gray100,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <TextField
          fullWidth
          label={`Answer ${index + 1}`}
          value={answer.content}
          onChange={(e) => handleAnswerChange(index, "content", e.target.value)}
          sx={{
            mb: 0.5,
            fontSize: "0.5rem",
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
          }}
        />

        <Stack direction="row" justifyContent="space-between">
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
                    color: isDarkMode ? color.emerald400 : color.emerald600,
                  },
                }}
              />
            }
            label="Correct Answer"
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={answer?.status}
                  onChange={(e) =>
                    handleAnswerChange(index, "status", e.target.checked)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: accentColor,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: accentColor,
                    },
                  }}
                />
              }
              label="Active"
            />
          </FormGroup>
        </Stack>
      </Box>

      <IconButton
        onClick={() => handleRemoveAnswer(index)}
        sx={{ color: isDarkMode ? color.red400 : color.red600, mt: 1 }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
