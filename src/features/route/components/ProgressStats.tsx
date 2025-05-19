import React, { useMemo } from "react";
import {
  Box,
  Card,
  Typography,
  Stack,
  Divider,
  LinearProgress,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Route, RouteNodeEnum } from "interfaces";
import ProgressBadge from "./ProgressBadge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface ProgressStatsProps {
  route: Route;
  process: number[];
}

export default function ProgressStats({ route, process }: ProgressStatsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Calculate progress metrics
  const progressMetrics = useMemo(() => {
    const totalNodes = route.routeNodes.length;
    const completedNodes = process.length;
    const progressPercentage =
      totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

    // Calculate completed/total by node type
    const byType: Record<string, { completed: number; total: number }> = {};

    route.routeNodes.forEach((node) => {
      // Group TEST types with their base type
      const baseType = node.type.includes("_TEST")
        ? (node.type.replace("_TEST", "") as RouteNodeEnum)
        : node.type;

      if (!byType[baseType]) {
        byType[baseType] = { completed: 0, total: 0 };
      }

      byType[baseType].total += 1;

      if (process.includes(node.id)) {
        byType[baseType].completed += 1;
      }
    });

    // Estimated completion time (assuming each uncompleted node takes ~30 mins)
    const remainingNodes = totalNodes - completedNodes;
    const estimatedTimeInHours = remainingNodes * 0.5; // 30 mins = 0.5 hours per node

    // Estimated completion date
    const completionDate = new Date();
    // Assuming 1 hour of learning per day
    const daysToComplete = Math.ceil(estimatedTimeInHours);
    completionDate.setDate(completionDate.getDate() + daysToComplete);

    return {
      totalNodes,
      completedNodes,
      progressPercentage,
      byType,
      estimatedTimeInHours,
      completionDate,
    };
  }, [route, process]);

  // Format date to readable string
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Card
      sx={{
        background: isDarkMode
          ? `linear-gradient(145deg, ${color.gray800}, ${color.gray900})`
          : `linear-gradient(145deg, ${color.white}, ${color.gray50})`,
        borderRadius: "16px",
        border: `1px solid ${isDarkMode ? color.teal900 : color.teal100}`,
        boxShadow: isDarkMode
          ? "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(14, 165, 143, 0.1)"
          : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(14, 165, 143, 0.1)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative element */}
      <Box
        sx={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? color.teal900 : color.teal50
          } 0%, transparent 70%)`,
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      <Box sx={{ p: 3, position: "relative", zIndex: 1 }}>
        {/* Badge and Progress */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <ProgressBadge
            progress={progressMetrics.completedNodes}
            total={progressMetrics.totalNodes}
            size="large"
            showLabel={true}
            showPercentage={true}
          />
        </Box>

        <Divider
          sx={{
            my: 2,
            borderColor: isDarkMode ? color.gray700 : color.gray200,
          }}
        />

        {/* Progress Statistics */}
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Progress Statistics
        </Typography>

        <Stack spacing={2}>
          {/* Completion Status */}
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircleIcon
              sx={{
                color: isDarkMode ? color.teal400 : color.teal500,
                fontSize: 20,
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray600,
                  fontWeight: "medium",
                }}
              >
                Completion Status
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontWeight: "bold",
                }}
              >
                {progressMetrics.completedNodes} of {progressMetrics.totalNodes}{" "}
                Lessons
              </Typography>
            </Box>
          </Stack>

          {/* Estimated Time Remaining */}
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon
              sx={{
                color: isDarkMode ? color.teal400 : color.teal500,
                fontSize: 20,
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray600,
                  fontWeight: "medium",
                }}
              >
                Estimated Time Remaining
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontWeight: "bold",
                }}
              >
                {progressMetrics.estimatedTimeInHours > 0
                  ? `${progressMetrics.estimatedTimeInHours.toFixed(1)} hours`
                  : "Completed!"}
              </Typography>
            </Box>
          </Stack>

          {/* Estimated Completion Date */}
          {progressMetrics.progressPercentage < 100 && (
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayIcon
                sx={{
                  color: isDarkMode ? color.teal400 : color.teal500,
                  fontSize: 20,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray600,
                    fontWeight: "medium",
                  }}
                >
                  Estimated Completion Date
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: isDarkMode ? color.gray200 : color.gray800,
                    fontWeight: "bold",
                  }}
                >
                  {formatDate(progressMetrics.completionDate)}
                </Typography>
              </Box>
            </Stack>
          )}
        </Stack>

        <Divider
          sx={{
            my: 2,
            borderColor: isDarkMode ? color.gray700 : color.gray200,
          }}
        />

        {/* Progress by Category */}
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Progress by Category
        </Typography>

        <Stack spacing={2}>
          {Object.entries(progressMetrics.byType).map(([type, data]) => {
            const typePercentage =
              data.total > 0
                ? Math.round((data.completed / data.total) * 100)
                : 0;

            // Get color based on type
            const getTypeColor = (nodeType: string): string => {
              switch (nodeType as RouteNodeEnum) {
                case RouteNodeEnum.VOCABULARY:
                  return isDarkMode ? color.teal300 : color.teal600;
                case RouteNodeEnum.GRAMMAR:
                  return isDarkMode ? color.teal400 : color.teal700;
                case RouteNodeEnum.READING:
                  return isDarkMode ? color.green300 : color.green600;
                case RouteNodeEnum.LISTENING:
                  return isDarkMode ? color.emerald300 : color.emerald600;
                case RouteNodeEnum.WRITING:
                  return isDarkMode ? color.green400 : color.green700;
                case RouteNodeEnum.SPEAKING:
                  return isDarkMode ? color.teal500 : color.teal800;
                default:
                  return isDarkMode ? color.teal300 : color.teal500;
              }
            };

            const typeColor = getTypeColor(type);

            return (
              <Box key={type}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  mb={0.5}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray300 : color.gray600,
                      fontWeight: "medium",
                    }}
                  >
                    {type}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: typeColor,
                      fontWeight: "bold",
                    }}
                  >
                    {data.completed}/{data.total}
                  </Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={typePercentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    mb: 0.5,
                    bgcolor: isDarkMode ? color.gray700 : color.gray200,
                    "& .MuiLinearProgress-bar": {
                      bgcolor: typeColor,
                      borderRadius: 4,
                    },
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray500,
                  }}
                >
                  {typePercentage}% complete
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Card>
  );
}
