import {
  Box,
  Stack,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  alpha,
  LinearProgress,
  Chip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";

export default function QuestionProgress({
  answeredCount,
  totalQuestions,
}: {
  answeredCount: number;
  totalQuestions: number;
}) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const progressPercentage = (answeredCount / totalQuestions) * 100;

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, md: 3 },
        mb: 3,
        borderRadius: 3,
        bgcolor: isDarkMode ? alpha(color.gray800, 0.7) : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <AssignmentTurnedInIcon
            sx={{
              color: isDarkMode ? color.emerald400 : color.emerald600,
              mr: 1.5,
              fontSize: 22,
            }}
          />
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
          >
            Progress
          </Typography>

          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{ mr: 1, color: isDarkMode ? color.gray300 : color.gray600 }}
            >
              Status:
            </Typography>
            {progressPercentage < 100 ? (
              <Chip
                icon={<PendingIcon fontSize="small" />}
                label="In Progress"
                size="small"
                sx={{
                  bgcolor: isDarkMode
                    ? alpha(color.warning, 0.2)
                    : alpha(color.warning, 0.1),
                  color: isDarkMode ? color.warningDarkMode : color.warning,
                  border: `1px solid ${
                    isDarkMode ? color.warningDarkMode : color.warning
                  }`,
                  "& .MuiChip-icon": {
                    color: isDarkMode ? color.warningDarkMode : color.warning,
                  },
                }}
              />
            ) : (
              <Chip
                icon={<CheckCircleIcon fontSize="small" />}
                label="Complete"
                size="small"
                sx={{
                  bgcolor: isDarkMode
                    ? alpha(color.success, 0.2)
                    : alpha(color.success, 0.1),
                  color: isDarkMode ? color.successDarkMode : color.success,
                  border: `1px solid ${
                    isDarkMode ? color.successDarkMode : color.success
                  }`,
                  "& .MuiChip-icon": {
                    color: isDarkMode ? color.successDarkMode : color.success,
                  },
                }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ px: { xs: 0, sm: 2 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              fontWeight="medium"
              sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
            >
              Questions Answered
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              fontWeight="bold"
              sx={{ color: isDarkMode ? color.emerald300 : color.emerald600 }}
            >
              {answeredCount} / {totalQuestions}
            </Typography>
          </Box>

          <Box sx={{ mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: isDarkMode ? alpha(color.gray700, 0.5) : color.gray200,
                "& .MuiLinearProgress-bar": {
                  bgcolor: isDarkMode ? color.emerald500 : color.emerald400,
                  borderRadius: 5,
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="caption"
              sx={{ color: isDarkMode ? color.gray400 : color.gray500 }}
            >
              0%
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: isDarkMode ? color.gray400 : color.gray500 }}
            >
              {Math.round(progressPercentage)}%
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: isDarkMode ? color.gray400 : color.gray500 }}
            >
              100%
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
