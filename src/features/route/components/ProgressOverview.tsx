import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Route, RouteNodeEnum } from "interfaces";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface ProgressOverviewProps {
  route: Route;
  process: number[];
}

export default function ProgressOverview({
  route,
  process,
}: ProgressOverviewProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Calculate progress
  const totalNodes = route.routeNodes.length;
  const completedNodes = process.length;
  const progressPercentage =
    totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;

  // Group completed nodes by type
  const completedByType: Record<RouteNodeEnum, number> = Object.values(
    RouteNodeEnum
  ).reduce(
    (acc, type) => ({ ...acc, [type]: 0 }),
    {} as Record<RouteNodeEnum, number>
  );

  const totalByType: Record<RouteNodeEnum, number> = Object.values(
    RouteNodeEnum
  ).reduce(
    (acc, type) => ({ ...acc, [type]: 0 }),
    {} as Record<RouteNodeEnum, number>
  );

  route.routeNodes.forEach((node) => {
    totalByType[node.type] = (totalByType[node.type] || 0) + 1;

    if (process.includes(node.id)) {
      completedByType[node.type] = (completedByType[node.type] || 0) + 1;
    }
  });

  // Filter only types that exist in this route
  const activeTypes = Object.keys(totalByType).filter(
    (type) => totalByType[type as RouteNodeEnum] > 0
  ) as RouteNodeEnum[];

  const getTypeColor = (type: RouteNodeEnum, isDark: boolean) => {
    switch (type) {
      case RouteNodeEnum.VOCABULARY:
        return isDark ? color.teal300 : color.teal600;
      case RouteNodeEnum.GRAMMAR:
        return isDark ? color.teal400 : color.teal700;
      case RouteNodeEnum.READING:
      case RouteNodeEnum.READING_TEST:
        return isDark ? color.green300 : color.green600;
      case RouteNodeEnum.LISTENING:
      case RouteNodeEnum.LISTENING_TEST:
        return isDark ? color.emerald300 : color.emerald600;
      case RouteNodeEnum.WRITING:
      case RouteNodeEnum.WRITING_TEST:
        return isDark ? color.green400 : color.green700;
      case RouteNodeEnum.SPEAKING:
      case RouteNodeEnum.SPEAKING_TEST:
        return isDark ? color.teal500 : color.teal800;
      case RouteNodeEnum.MIXING_TEST:
        return isDark ? color.emerald400 : color.emerald600;
      default:
        return isDark ? color.teal300 : color.teal500;
    }
  };

  const formatTypeName = (type: RouteNodeEnum) => {
    return type.replace("_", " ").replace("TEST", " Test");
  };

  // Get achievement status text and color
  const getAchievementText = () => {
    if (progressPercentage === 0) return "Not Started";
    if (progressPercentage < 25) return "Just Started";
    if (progressPercentage < 50) return "Getting There";
    if (progressPercentage < 75) return "Good Progress";
    if (progressPercentage < 100) return "Almost There";
    return "Completed!";
  };

  const getAchievementColor = () => {
    if (progressPercentage === 0) return color.gray500;
    if (progressPercentage < 25) return color.teal500;
    if (progressPercentage < 50) return color.teal400;
    if (progressPercentage < 75) return color.emerald500;
    if (progressPercentage < 100) return color.emerald400;
    return color.emerald300;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "16px",
        background: isDarkMode
          ? `linear-gradient(145deg, ${color.gray800}, ${color.gray900})`
          : `linear-gradient(145deg, ${color.white}, ${color.gray50})`,
        border: `1px solid ${isDarkMode ? color.teal900 : color.teal100}`,
        boxShadow: isDarkMode
          ? "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(14, 165, 143, 0.1)"
          : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(14, 165, 143, 0.1)",
        mb: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative element */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? color.teal900 : color.teal50
          } 0%, transparent 70%)`,
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <EmojiEventsIcon
            sx={{
              color: getAchievementColor(),
              fontSize: 28,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: isDarkMode ? color.teal300 : color.teal600,
            }}
          >
            Your Progress
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
          mb={3}
        >
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? color.gray200 : color.gray700,
              fontWeight: "medium",
            }}
          >
            {completedNodes} of {totalNodes} lessons completed
          </Typography>

          <Chip
            icon={
              progressPercentage === 100 ? <CheckCircleIcon /> : <PendingIcon />
            }
            label={getAchievementText()}
            sx={{
              backgroundColor: isDarkMode
                ? `${getAchievementColor()}22`
                : `${getAchievementColor()}15`,
              color: getAchievementColor(),
              borderRadius: "12px",
              fontWeight: "bold",
              border: `1px solid ${getAchievementColor()}33`,
              px: 1,
            }}
          />
        </Stack>

        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? color.gray300 : color.gray600,
              }}
            >
              Overall Progress
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: isDarkMode ? color.teal300 : color.teal600,
              }}
            >
              {Math.round(progressPercentage)}%
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: isDarkMode ? color.gray700 : color.gray200,
              "& .MuiLinearProgress-bar": {
                bgcolor:
                  progressPercentage === 100
                    ? isDarkMode
                      ? color.emerald300
                      : color.emerald500
                    : isDarkMode
                    ? color.teal300
                    : color.teal500,
                borderRadius: 5,
                transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              },
            }}
          />
        </Box>

        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontWeight: "medium",
            color: isDarkMode ? color.gray200 : color.gray700,
          }}
        >
          Progress by Category
        </Typography>

        <Stack spacing={2}>
          {activeTypes.map((type) => {
            const typeProgressPercentage =
              totalByType[type] > 0
                ? (completedByType[type] / totalByType[type]) * 100
                : 0;

            return (
              <Tooltip
                key={type}
                title={`${completedByType[type]}/${totalByType[type]} completed`}
                arrow
              >
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={0.5}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? color.gray300 : color.gray600,
                      }}
                    >
                      {formatTypeName(type)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "medium",
                        color: getTypeColor(type, isDarkMode),
                      }}
                    >
                      {completedByType[type]}/{totalByType[type]}
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={typeProgressPercentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: isDarkMode ? color.gray700 : color.gray200,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: getTypeColor(type, isDarkMode),
                        borderRadius: 4,
                        transition:
                          "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                      },
                    }}
                  />
                </Box>
              </Tooltip>
            );
          })}
        </Stack>
      </Box>
    </Paper>
  );
}
