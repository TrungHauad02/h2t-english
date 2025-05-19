import React from "react";
import { Box, Typography, Stack, Paper, Divider, Fade } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";
import ProgressVisualization from "./ProgressVisualization";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SchoolIcon from "@mui/icons-material/School";

// Types for insights to improve maintainability
interface Insight {
  text: string;
  icon: React.ReactNode;
  type: "info" | "success" | "warning" | "tip";
}

interface ProgressAnalyticsTabProps {
  route: Route;
  process: number[];
}

export default function ProgressAnalyticsTab({
  route,
  process,
}: ProgressAnalyticsTabProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Calculate progress percentage
  const progressPercentage =
    route.routeNodes.length > 0
      ? Math.round((process.length / route.routeNodes.length) * 100)
      : 0;

  // Generate insights based on progress
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];

    if (progressPercentage === 0) {
      insights.push({
        text: "Start your learning journey! Complete the first lesson to begin tracking your progress.",
        icon: <PlayArrowIcon />,
        type: "info",
      });
    } else if (progressPercentage === 100) {
      insights.push({
        text: "Congratulations! You've completed all lessons in this learning path.",
        icon: <TipsAndUpdatesIcon />,
        type: "success",
      });
    } else {
      // Calculate learning pace
      if (process.length > 0) {
        insights.push({
          text: `You're making good progress! You've completed ${process.length} out of ${route.routeNodes.length} lessons.`,
          icon: <TipsAndUpdatesIcon />,
          type: "success",
        });
      }

      // Group by category for analysis
      const byType: Record<string, { completed: number; total: number }> = {};

      route.routeNodes.forEach((node) => {
        const baseType = node.type.includes("_TEST")
          ? node.type.replace("_TEST", "")
          : node.type;

        if (!byType[baseType]) {
          byType[baseType] = { completed: 0, total: 0 };
        }

        byType[baseType].total += 1;

        if (process.includes(node.id)) {
          byType[baseType].completed += 1;
        }
      });

      // Find type with lowest completion rate
      let lowestType = "";
      let lowestRate = 1;

      Object.entries(byType).forEach(([type, data]) => {
        if (data.total > 0) {
          const rate = data.completed / data.total;
          if (rate < lowestRate) {
            lowestRate = rate;
            lowestType = type;
          }
        }
      });

      if (lowestType && lowestRate < 0.5) {
        insights.push({
          text: `Consider focusing more on ${lowestType} lessons, which has a lower completion rate than other areas.`,
          icon: <LightbulbIcon />,
          type: "tip",
        });
      }

      // Add a learning tip based on progress
      if (progressPercentage > 25 && progressPercentage < 75) {
        insights.push({
          text: "Keep up the good work! Consistent practice leads to better results.",
          icon: <SchoolIcon />,
          type: "tip",
        });
      }
    }

    return insights;
  };

  // Get background color based on insight type
  const getInsightBackgroundColor = (
    type: "info" | "success" | "warning" | "tip"
  ): string => {
    switch (type) {
      case "success":
        return isDarkMode ? `${color.emerald900}40` : `${color.emerald50}`;
      case "warning":
        return isDarkMode ? `${color.yellow900}40` : `${color.yellow50}`;
      case "tip":
        return isDarkMode ? `${color.teal900}40` : `${color.teal50}`;
      case "info":
      default:
        return isDarkMode ? `${color.gray800}` : `${color.gray50}`;
    }
  };

  // Get border color based on insight type
  const getInsightBorderColor = (
    type: "info" | "success" | "warning" | "tip"
  ): string => {
    switch (type) {
      case "success":
        return isDarkMode ? color.emerald800 : color.emerald200;
      case "warning":
        return isDarkMode ? color.yellow800 : color.yellow200;
      case "tip":
        return isDarkMode ? color.teal800 : color.teal200;
      case "info":
      default:
        return isDarkMode ? color.gray700 : color.gray200;
    }
  };

  // Get icon background color based on insight type
  const getInsightIconColor = (
    type: "info" | "success" | "warning" | "tip"
  ): string => {
    switch (type) {
      case "success":
        return isDarkMode ? color.emerald400 : color.emerald600;
      case "warning":
        return isDarkMode ? color.yellow400 : color.yellow600;
      case "tip":
        return isDarkMode ? color.teal400 : color.teal600;
      case "info":
      default:
        return isDarkMode ? color.teal300 : color.teal600;
    }
  };

  // Generated insights
  const insights = generateInsights();

  return (
    <Stack spacing={4}>
      {/* Progress Visualization */}
      <Paper
        elevation={isDarkMode ? 2 : 1}
        sx={{
          overflow: "hidden",
          borderRadius: "16px",
          bgcolor: isDarkMode ? color.gray900 : color.white,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        }}
      >
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <ProgressVisualization route={route} process={process} />
        </Box>
      </Paper>

      {/* Learning Insights Section */}
      <Paper
        elevation={isDarkMode ? 2 : 1}
        sx={{
          overflow: "hidden",
          borderRadius: "16px",
          bgcolor: isDarkMode ? color.gray900 : color.white,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        }}
      >
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
              fontWeight: "bold",
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LightbulbIcon
              sx={{ color: isDarkMode ? color.teal300 : color.teal500 }}
            />
            Learning Insights
          </Typography>

          <Divider
            sx={{
              mb: 3,
              borderColor: isDarkMode ? color.gray700 : color.gray200,
            }}
          />

          <Stack spacing={2.5}>
            {insights.length === 0 ? (
              <Box
                sx={{
                  py: 3,
                  textAlign: "center",
                  color: isDarkMode ? color.gray400 : color.gray500,
                }}
              >
                <Typography variant="body1">
                  No insights available yet. Start your learning journey to get
                  personalized insights!
                </Typography>
              </Box>
            ) : (
              insights.map((insight, index) => (
                <Fade
                  key={index}
                  in={true}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: "12px",
                      backgroundColor: getInsightBackgroundColor(insight.type),
                      border: `1px solid ${getInsightBorderColor(
                        insight.type
                      )}`,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: isDarkMode
                          ? `0 4px 20px rgba(0, 0, 0, 0.3)`
                          : `0 4px 20px rgba(0, 0, 0, 0.07)`,
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 44,
                          height: 44,
                          borderRadius: "10px",
                          backgroundColor: isDarkMode
                            ? `${getInsightIconColor(insight.type)}25`
                            : `${getInsightIconColor(insight.type)}15`,
                          color: getInsightIconColor(insight.type),
                          flexShrink: 0,
                          border: `1px solid ${getInsightIconColor(
                            insight.type
                          )}40`,
                        }}
                      >
                        {insight.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: isDarkMode ? color.gray200 : color.gray800,
                            fontWeight: "medium",
                            lineHeight: 1.6,
                          }}
                        >
                          {insight.text}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Fade>
              ))
            )}
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
}
