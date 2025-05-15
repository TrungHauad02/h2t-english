import { Box, Typography, Stack, Chip } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface CompetitionSummaryProps {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
}

export default function CompetitionSummary({
  totalQuestions,
  correctAnswers,
  score,
}: CompetitionSummaryProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
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
          Competition Summary
        </Typography>
      </Box>

      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
          >
            Total Questions:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.gray200 : color.gray800,
            }}
          >
            {totalQuestions}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
          >
            Correct Answers:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.green400 : color.green600,
            }}
          >
            {Math.round(correctAnswers)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
          >
            Final Score:
          </Typography>
          <Chip
            label={`${Math.round(score)} points`}
            sx={{
              fontWeight: 600,
              bgcolor: (() => {
                const scoreColor = getScoreColor(score);
                return isDarkMode ? `${scoreColor}33` : `${scoreColor}22`;
              })(),
              color: getScoreColor(score),
              borderRadius: "8px",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
