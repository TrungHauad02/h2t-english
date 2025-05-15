import { Box, Typography, CircularProgress } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface OverallScoreProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export default function OverallScore({
  score,
  correctAnswers,
  totalQuestions,
}: OverallScoreProps) {
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        bgcolor: isDarkMode ? color.gray700 : color.gray50,
        border: "1px solid",
        borderColor: isDarkMode ? color.gray600 : color.gray200,
        borderRadius: "16px",
        height: "100%",
        minHeight: "220px",
      }}
    >
      <Box sx={{ position: "relative", mb: 2 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={150}
          thickness={4}
          sx={{ color: isDarkMode ? color.gray600 : color.gray200 }}
        />
        <CircularProgress
          variant="determinate"
          value={score}
          size={150}
          thickness={4}
          sx={{
            color: getScoreColor(score),
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            component="div"
            sx={{
              fontWeight: 700,
              color: getScoreColor(score),
            }}
          >
            {Math.round(score)}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 500,
              color: isDarkMode ? color.gray300 : color.gray600,
            }}
          >
            points
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          color: isDarkMode ? color.gray300 : color.gray700,
          textAlign: "center",
        }}
      >
        <Box component="span" sx={{ fontWeight: 600 }}>
          {Math.round(correctAnswers)}
        </Box>{" "}
        / {totalQuestions} correct answers
      </Typography>
    </Box>
  );
}
