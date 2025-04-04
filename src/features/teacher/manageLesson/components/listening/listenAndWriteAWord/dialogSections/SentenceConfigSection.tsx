import {
  Typography,
  Box,
  TextField,
  Stack,
  Slider,
  Paper,
  Chip,
  Tooltip,
  IconButton,
  Fade,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ListenAndWriteAWord } from "interfaces";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface SentenceConfigSectionProps {
  formData: ListenAndWriteAWord;
  sentenceWords: string[];
  handleChange: (name: keyof ListenAndWriteAWord, value: any) => void;
  handleMissingIndexChange: (event: Event, newValue: number | number[]) => void;
  isSaving: boolean;
}

export default function SentenceConfigSection({
  formData,
  sentenceWords,
  handleChange,
  handleMissingIndexChange,
  isSaving,
}: SentenceConfigSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  // Preview state and effect removed

  const handleIncreaseMissingIndex = () => {
    if (formData.missingIndex < sentenceWords.length) {
      const newValue = formData.missingIndex + 1;
      handleMissingIndexChange({} as Event, newValue);
    }
  };

  const handleDecreaseMissingIndex = () => {
    if (formData.missingIndex > 0) {
      const newValue = formData.missingIndex - 1;
      handleMissingIndexChange({} as Event, newValue);
    }
  };

  return (
    <Box
      component={Paper}
      elevation={2}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        borderLeft: `4px solid ${isDarkMode ? color.teal400 : color.teal600}`,
        mb: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: isDarkMode ? color.teal300 : color.teal700,
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <EditIcon sx={{ fontSize: "1.2rem" }} />
        Sentence Configuration
      </Typography>

      <TextField
        label="Sentence"
        fullWidth
        multiline
        rows={2}
        value={formData.sentence}
        onChange={(e) => handleChange("sentence", e.target.value)}
        disabled={isSaving}
        error={formData.sentence.trim() === ""}
        helperText={
          formData.sentence.trim() === ""
            ? "Sentence is required"
            : "Enter a complete sentence for the exercise"
        }
        sx={{ mb: 3 }}
        InputProps={{
          sx: {
            backgroundColor: isDarkMode ? color.gray700 : color.gray50,
            color: isDarkMode ? color.white : color.gray900,
            borderRadius: "0.75rem",
          },
        }}
      />

      {formData.sentence && (
        <>
          <TextField
            label="Missing Word"
            fullWidth
            value={formData.correctAnswer}
            onChange={(e) => handleChange("correctAnswer", e.target.value)}
            disabled={isSaving || sentenceWords.length === 0}
            error={formData.correctAnswer.trim() === ""}
            helperText={
              formData.correctAnswer.trim() === ""
                ? "Missing word is required"
                : "Enter the word that will be hidden"
            }
            sx={{ mb: 1 }}
            InputProps={{
              sx: {
                backgroundColor: isDarkMode ? color.gray700 : color.gray50,
                color: isDarkMode ? color.white : color.gray900,
                borderRadius: "0.75rem",
              },
            }}
          />

          <Box sx={{ mb: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                >
                  Missing Word Position:
                </Typography>
                <Chip
                  label={formData.missingIndex}
                  color="primary"
                  sx={{
                    backgroundColor: isDarkMode ? color.teal600 : color.teal500,
                    fontWeight: 600,
                    minWidth: "40px",
                  }}
                />
                <Tooltip
                  title="Position 0 means before the first word, position 1 means after the first word, etc."
                  placement="top"
                  TransitionComponent={Fade}
                  arrow
                >
                  <IconButton size="small">
                    <InfoOutlinedIcon
                      fontSize="small"
                      sx={{ color: isDarkMode ? color.gray400 : color.gray500 }}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>

              {/* Position Controls */}
              <Stack direction="row" spacing={1}>
                <Tooltip title="Move Left" placement="top">
                  <span>
                    <IconButton
                      size="small"
                      onClick={handleDecreaseMissingIndex}
                      disabled={isSaving || formData.missingIndex <= 0}
                      sx={{
                        backgroundColor: isDarkMode
                          ? color.gray700
                          : color.gray200,
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? color.gray600
                            : color.gray300,
                        },
                        "&.Mui-disabled": {
                          backgroundColor: isDarkMode
                            ? color.gray800
                            : color.gray100,
                        },
                      }}
                    >
                      <ArrowLeftIcon />
                    </IconButton>
                  </span>
                </Tooltip>

                <Tooltip title="Move Right" placement="top">
                  <span>
                    <IconButton
                      size="small"
                      onClick={handleIncreaseMissingIndex}
                      disabled={
                        isSaving ||
                        formData.missingIndex >= sentenceWords.length
                      }
                      sx={{
                        backgroundColor: isDarkMode
                          ? color.gray700
                          : color.gray200,
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? color.gray600
                            : color.gray300,
                        },
                        "&.Mui-disabled": {
                          backgroundColor: isDarkMode
                            ? color.gray800
                            : color.gray100,
                        },
                      }}
                    >
                      <ArrowRightIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Stack>

            <Slider
              value={formData.missingIndex}
              min={0}
              max={Math.max(0, sentenceWords.length)}
              step={1}
              onChange={handleMissingIndexChange}
              disabled={isSaving || sentenceWords.length <= 1}
              marks={
                sentenceWords.length > 0
                  ? [0, sentenceWords.length].map((value) => ({
                      value,
                      label: value === 0 ? "Start" : "End",
                    }))
                  : undefined
              }
              valueLabelDisplay="auto"
              sx={{
                color: isDarkMode ? color.teal500 : color.teal600,
                "& .MuiSlider-thumb": {
                  height: 18,
                  width: 18,
                  backgroundColor: isDarkMode ? color.teal300 : color.teal600,
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${
                      isDarkMode
                        ? "rgba(94, 234, 212, 0.16)"
                        : "rgba(13, 148, 136, 0.16)"
                    }`,
                  },
                },
                "& .MuiSlider-track": {
                  height: 6,
                },
                "& .MuiSlider-rail": {
                  height: 6,
                  backgroundColor: isDarkMode ? color.gray600 : color.gray300,
                },
                "& .MuiSlider-mark": {
                  backgroundColor: isDarkMode ? color.gray400 : color.gray600,
                  height: 8,
                  width: 2,
                  marginTop: -2,
                },
                "& .MuiSlider-markLabel": {
                  color: isDarkMode ? color.gray300 : color.gray700,
                  fontSize: "0.75rem",
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
