import {
  Stack,
  Typography,
  TextField,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { LessonQuestion } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Save } from "@mui/icons-material";
import StyledCard from "../../StyledCard";

interface QuestionDetailsProps {
  editData: LessonQuestion;
  handleQuestionChange: (field: keyof LessonQuestion, value: any) => void;
  accentColor: string;
  handleSave: () => void;
}

export default function QuestionDetailsSection({
  editData,
  handleQuestionChange,
  accentColor,
  handleSave,
}: QuestionDetailsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <StyledCard>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="subtitle1"
          fontWeight="medium"
          color={accentColor}
          sx={{ mb: 2 }}
        >
          Question Details
        </Typography>

        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          sx={{ mb: 1 }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={editData?.status}
                  onChange={(e) =>
                    handleQuestionChange("status", e.target.checked)
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
          <IconButton
            onClick={handleSave}
            sx={{
              color: accentColor,
              bgcolor: isDarkMode ? color.gray600 : color.gray100,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray500 : color.gray300,
              },
            }}
          >
            <Save />
          </IconButton>
        </Stack>
      </Stack>

      <TextField
        fullWidth
        label="Question Content"
        value={editData?.content || ""}
        onChange={(e) => handleQuestionChange("content", e.target.value)}
        multiline
        rows={3}
        sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
      />

      <TextField
        fullWidth
        label="Explanation"
        value={editData?.explanation || ""}
        onChange={(e) => handleQuestionChange("explanation", e.target.value)}
        multiline
        rows={2}
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
      />
    </StyledCard>
  );
}
