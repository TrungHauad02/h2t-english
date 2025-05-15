import { Box, Typography, Stack, Paper, Chip } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { TestPartTypeEnum } from "interfaces";

interface PartResult {
  type: TestPartTypeEnum;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  weightedScore?: number;
}

interface SectionPerformanceProps {
  parts: PartResult[];
}

export default function SectionPerformance({ parts }: SectionPerformanceProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getSectionName = (type: TestPartTypeEnum) => {
    switch (type) {
      case TestPartTypeEnum.VOCABULARY:
        return "Vocabulary";
      case TestPartTypeEnum.GRAMMAR:
        return "Grammar";
      case TestPartTypeEnum.READING:
        return "Reading";
      case TestPartTypeEnum.LISTENING:
        return "Listening";
      case TestPartTypeEnum.SPEAKING:
        return "Speaking";
      case TestPartTypeEnum.WRITING:
        return "Writing";
      default:
        return String(type);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return isDarkMode ? color.green500 : color.green600;
    if (score >= 80) return isDarkMode ? color.emerald500 : color.emerald600;
    if (score >= 70) return isDarkMode ? color.teal500 : color.teal600;
    if (score >= 60) return isDarkMode ? color.teal600 : color.teal700;
    if (score >= 50) return isDarkMode ? color.teal700 : color.teal800;
    return isDarkMode ? color.red500 : color.red600;
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: isDarkMode ? color.gray700 : color.gray50,
        border: "1px solid",
        borderColor: isDarkMode ? color.gray600 : color.gray200,
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <EqualizerIcon
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
            fontSize: 20,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? color.gray200 : color.gray800,
          }}
        >
          Section Performance
        </Typography>
      </Box>

      <Stack spacing={2}>
        {parts.map((part, index) => (
          <Paper
            key={part.type}
            elevation={0}
            sx={{
              p: 2,
              bgcolor: isDarkMode ? color.gray800 : color.white,
              border: "1px solid",
              borderColor: isDarkMode ? color.gray600 : color.gray200,
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  minWidth: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  bgcolor: isDarkMode ? color.gray700 : color.gray100,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: isDarkMode ? color.gray300 : color.gray600,
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: isDarkMode ? color.gray100 : color.gray900,
                    mb: 0.5,
                  }}
                >
                  {getSectionName(part.type)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                >
                  {part.correctAnswers} / {part.totalQuestions} correct answers
                </Typography>
              </Box>
            </Box>

            <Chip
              label={`${Math.round(part.score)}%`}
              sx={{
                fontWeight: 600,
                bgcolor: (() => {
                  const scoreColor = getScoreColor(part.score);
                  return isDarkMode ? `${scoreColor}33` : `${scoreColor}22`;
                })(),
                color: getScoreColor(part.score),
                borderRadius: "8px",
              }}
            />
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
