import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { SeverityEnum } from "interfaces";
import BugReportIcon from "@mui/icons-material/BugReport";

interface ErrorLogStatsProps {
  data: {
    total: number;
    bySeverity: Record<SeverityEnum, number>;
  };
  isLoading: boolean;
}

export default function ErrorLogStats({ data, isLoading }: ErrorLogStatsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const severityColors = {
    [SeverityEnum.LOW]: {
      bar: isDarkMode ? color.green400 : color.green500,
      bg: isDarkMode ? color.green900 : color.green100,
      text: isDarkMode ? color.green200 : color.green800,
    },
    [SeverityEnum.MEDIUM]: {
      bar: isDarkMode ? color.warning : color.warning,
      bg: isDarkMode ? "rgba(251, 191, 36, 0.2)" : "rgba(251, 191, 36, 0.1)",
      text: isDarkMode ? color.warning : color.warning,
    },
    [SeverityEnum.HIGH]: {
      bar: isDarkMode ? color.error : color.error,
      bg: isDarkMode ? "rgba(220, 38, 38, 0.2)" : "rgba(220, 38, 38, 0.1)",
      text: isDarkMode ? color.errorDarkMode : color.error,
    },
  };

  const calculatePercentage = (value: number): number => {
    return data.total > 0 ? (value / data.total) * 100 : 0;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          borderBottom: `2px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
          pb: 1,
        }}
      >
        <BugReportIcon
          sx={{ color: isDarkMode ? color.red400 : color.red600, mr: 1 }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: isDarkMode ? color.red300 : color.red700 }}
        >
          Error Log Distribution
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ mt: 3 }}>
          {[1, 2, 3].map((item) => (
            <Box sx={{ mb: 2 }} key={item}>
              <Skeleton
                variant="text"
                width="40%"
                height={24}
                sx={{
                  bgcolor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              />
              <Skeleton
                variant="rectangular"
                height={20}
                sx={{
                  borderRadius: 1,
                  mt: 1,
                  bgcolor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {Object.values(SeverityEnum).map((severity) => {
            const count = data.bySeverity[severity] || 0;
            const percentage = calculatePercentage(count);

            return (
              <Box sx={{ mb: 2.5 }} key={severity}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{ color: severityColors[severity].text }}
                  >
                    {severity}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ color: severityColors[severity].text }}
                    >
                      {count.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? color.gray400 : color.gray600,
                        ml: 0.5,
                      }}
                    >
                      ({percentage.toFixed(1)}%)
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ position: "relative" }}>
                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: severityColors[severity].bg,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: severityColors[severity].bar,
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {!isLoading && (
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px dashed ${
              isDarkMode ? color.gray700 : color.gray300
            }`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
          >
            Total Errors:
          </Typography>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
          >
            {data.total.toLocaleString()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
