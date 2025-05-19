import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Tooltip,
  CircularProgress,
  Stack,
  Fade,
  Divider,
  alpha,
  Avatar,
  Badge,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Route, RouteNodeEnum } from "interfaces";

import VocabularyIcon from "@mui/icons-material/MenuBook";
import GrammarIcon from "@mui/icons-material/AutoAwesomeMotion";
import ReadingIcon from "@mui/icons-material/ImportContacts";
import ListeningIcon from "@mui/icons-material/Headphones";
import WritingIcon from "@mui/icons-material/Edit";
import SpeakingIcon from "@mui/icons-material/RecordVoiceOver";
import TestIcon from "@mui/icons-material/Quiz";
import InsightsIcon from "@mui/icons-material/Insights";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SchoolIcon from "@mui/icons-material/School";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { styled } from "@mui/material/styles";

const ProgressContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ProgressCircleWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "scale(1.05) translateY(-5px)",
    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
  },
}));

interface ProgressVisualizationProps {
  route: Route;
  process: number[];
}

interface CategoryProgress {
  type: RouteNodeEnum;
  total: number;
  completed: number;
  percentage: number;
}

export default function ProgressVisualization({
  route,
  process,
}: ProgressVisualizationProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const formatTypeName = (type: RouteNodeEnum): string => {
    return type.replace("_", " ").replace("TEST", " Test");
  };

  const getTypeColor = (type: RouteNodeEnum): string => {
    if (type.includes("TEST")) {
      return isDarkMode ? color.emerald400 : color.emerald600;
    }

    switch (type) {
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
      case RouteNodeEnum.MIXING_TEST: // Special color for Mixing_Test
        return isDarkMode ? color.yellow400 : color.yellow600;
      default:
        return isDarkMode ? color.teal300 : color.teal500;
    }
  };

  const getTypeIcon = (type: RouteNodeEnum) => {
    switch (type) {
      case RouteNodeEnum.VOCABULARY:
        return <VocabularyIcon fontSize="small" />;
      case RouteNodeEnum.GRAMMAR:
        return <GrammarIcon fontSize="small" />;
      case RouteNodeEnum.READING:
      case RouteNodeEnum.READING_TEST:
        return <ReadingIcon fontSize="small" />;
      case RouteNodeEnum.LISTENING:
      case RouteNodeEnum.LISTENING_TEST:
        return <ListeningIcon fontSize="small" />;
      case RouteNodeEnum.WRITING:
      case RouteNodeEnum.WRITING_TEST:
        return <WritingIcon fontSize="small" />;
      case RouteNodeEnum.SPEAKING:
      case RouteNodeEnum.SPEAKING_TEST:
        return <SpeakingIcon fontSize="small" />;
      case RouteNodeEnum.MIXING_TEST:
        return <ShuffleIcon fontSize="small" />; // New specific icon for Mixing_Test
      default:
        return <TestIcon fontSize="small" />;
    }
  };

  // Calculate category-based progress
  const categoryProgress = useMemo(() => {
    const progressMap: Record<string, CategoryProgress> = {};

    // Initialize with all types set to 0
    Object.values(RouteNodeEnum).forEach((type) => {
      // For MIXING_TEST, keep it as a separate category
      if (type === RouteNodeEnum.MIXING_TEST) {
        if (!progressMap[type]) {
          progressMap[type] = {
            type: type as RouteNodeEnum,
            total: 0,
            completed: 0,
            percentage: 0,
          };
        }
        return;
      }

      // Group other TEST types into their base category
      const baseType = type.includes("_TEST")
        ? type.replace("_TEST", "")
        : type;

      if (!progressMap[baseType]) {
        progressMap[baseType] = {
          type: baseType as RouteNodeEnum,
          total: 0,
          completed: 0,
          percentage: 0,
        };
      }
    });

    // Count total nodes by category
    route.routeNodes.forEach((node) => {
      // For MIXING_TEST, keep it separate
      if (node.type === RouteNodeEnum.MIXING_TEST) {
        progressMap[node.type].total += 1;
        if (process.includes(node.id)) {
          progressMap[node.type].completed += 1;
        }
        return;
      }

      const baseType = node.type.includes("_TEST")
        ? (node.type.replace("_TEST", "") as RouteNodeEnum)
        : node.type;

      progressMap[baseType].total += 1;

      // Check if this node is completed
      if (process.includes(node.id)) {
        progressMap[baseType].completed += 1;
      }
    });

    // Calculate percentages and filter out empty categories
    return Object.values(progressMap)
      .filter((item) => item.total > 0)
      .map((item) => ({
        ...item,
        percentage: Math.round((item.completed / item.total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage); // Sort by percentage desc
  }, [route, process]);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const totalNodes = route.routeNodes.length;
    const completedNodes = process.length;
    return totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;
  }, [route, process]);

  // Get status message based on progress
  const getProgressStatus = () => {
    if (overallProgress === 0) return "Not Started";
    if (overallProgress < 25) return "Just Beginning";
    if (overallProgress < 50) return "Making Progress";
    if (overallProgress < 75) return "Well Underway";
    if (overallProgress < 100) return "Almost Done";
    return "Completed";
  };

  // Get progress color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage === 100) {
      return isDarkMode ? color.emerald400 : color.emerald600;
    }
    if (percentage >= 75) {
      return isDarkMode ? color.emerald500 : color.emerald500;
    }
    if (percentage >= 50) {
      return isDarkMode ? color.teal400 : color.teal500;
    }
    if (percentage >= 25) {
      return isDarkMode ? color.teal500 : color.teal600;
    }
    return isDarkMode ? color.teal600 : color.teal700;
  };

  // Get level name based on percentage
  const getLevelName = (percentage: number): string => {
    if (percentage === 100) return "Mastered";
    if (percentage >= 75) return "Advanced";
    if (percentage >= 50) return "Intermediate";
    if (percentage >= 25) return "Basic";
    return "Beginner";
  };

  // Get level icon based on percentage
  const getLevelIcon = (percentage: number) => {
    if (percentage === 100) return <MilitaryTechIcon fontSize="small" />;
    if (percentage >= 75) return <SchoolIcon fontSize="small" />;
    if (percentage >= 50) return <AutoGraphIcon fontSize="small" />;
    if (percentage >= 25) return <InsightsIcon fontSize="small" />;
    return <DonutLargeIcon fontSize="small" />;
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <DonutLargeIcon
            sx={{ color: isDarkMode ? color.teal300 : color.teal500 }}
          />
          Overall Progress
        </Typography>

        <Divider
          sx={{
            mb: 3,
            borderColor: isDarkMode ? color.gray700 : color.gray200,
          }}
        />

        <Box sx={{ position: "relative" }}>
          {/* Background decorator */}
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
              opacity: 0.5,
              zIndex: 0,
            }}
          />

          <Grid
            container
            spacing={4}
            alignItems="center"
            sx={{ position: "relative", zIndex: 1 }}
          >
            {/* Main progress circle */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Fade in={true}>
                <ProgressContainer>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <Avatar
                        sx={{
                          backgroundColor: isDarkMode
                            ? color.teal700
                            : color.teal100,
                          color: isDarkMode ? color.teal300 : color.teal700,
                          width: 50,
                          height: 50,
                          border: `3px solid ${
                            isDarkMode ? color.gray900 : color.white
                          }`,
                          boxShadow: `0 4px 12px ${alpha(color.teal600, 0.2)}`,
                        }}
                      >
                        {getLevelIcon(overallProgress)}
                      </Avatar>
                    }
                  >
                    <ProgressCircleWrapper>
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={220}
                        thickness={4}
                        sx={{
                          color: alpha(
                            isDarkMode ? color.gray700 : color.gray200,
                            0.8
                          ),
                          position: "absolute",
                        }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={overallProgress}
                        size={220}
                        thickness={4}
                        sx={{
                          color: getProgressColor(overallProgress),
                          boxShadow:
                            overallProgress > 0
                              ? `0 0 30px ${alpha(
                                  getProgressColor(overallProgress),
                                  0.4
                                )}`
                              : "none",
                          borderRadius: "50%",
                        }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: "bold",
                            color: getProgressColor(overallProgress),
                            textShadow:
                              overallProgress > 0
                                ? `0 0 10px ${alpha(
                                    getProgressColor(overallProgress),
                                    0.3
                                  )}`
                                : "none",
                            lineHeight: 1.1,
                          }}
                        >
                          {`${overallProgress}%`}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mt: 1,
                            color: isDarkMode ? color.gray300 : color.gray600,
                            fontWeight: "medium",
                          }}
                        >
                          {getProgressStatus()}
                        </Typography>
                      </Box>
                    </ProgressCircleWrapper>
                  </Badge>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 4,
                      color: isDarkMode ? color.gray400 : color.gray500,
                    }}
                  >
                    {process.length} of {route.routeNodes.length} lessons
                    completed
                  </Typography>
                </ProgressContainer>
              </Fade>
            </Grid>

            {/* Progress stats */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  pl: { md: 3 },
                  borderLeft: {
                    md: `1px solid ${
                      isDarkMode ? color.gray700 : color.gray200
                    }`,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: isDarkMode ? color.gray200 : color.gray800,
                    fontWeight: "medium",
                  }}
                >
                  Progress Breakdown
                </Typography>

                <Grid container spacing={2}>
                  {categoryProgress.map((category, index) => (
                    <Grid item xs={6} sm={4} key={category.type}>
                      <Fade
                        in={true}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: "12px",
                            backgroundColor: alpha(
                              getTypeColor(category.type),
                              isDarkMode ? 0.1 : 0.05
                            ),
                            border: `1px solid ${alpha(
                              getTypeColor(category.type),
                              0.2
                            )}`,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: alpha(
                                getTypeColor(category.type),
                                isDarkMode ? 0.15 : 0.08
                              ),
                              transform: "translateY(-3px)",
                              boxShadow: `0 6px 15px ${alpha(
                                getTypeColor(category.type),
                                0.15
                              )}`,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                backgroundColor: alpha(
                                  getTypeColor(category.type),
                                  0.2
                                ),
                                color: getTypeColor(category.type),
                                border: `1px solid ${alpha(
                                  getTypeColor(category.type),
                                  0.3
                                )}`,
                              }}
                            >
                              {getTypeIcon(category.type)}
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                color: getTypeColor(category.type),
                              }}
                            >
                              {category.percentage}%
                            </Typography>
                          </Box>

                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "medium",
                              color: isDarkMode ? color.gray300 : color.gray700,
                            }}
                          >
                            {formatTypeName(category.type)}
                          </Typography>

                          <Tooltip
                            title={`${category.percentage}% complete`}
                            arrow
                          >
                            <Box
                              sx={{
                                position: "relative",
                                height: 8,
                                width: "100%",
                                borderRadius: 4,
                                bgcolor: alpha(
                                  getTypeColor(category.type),
                                  0.1
                                ),
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  bottom: 0,
                                  width: `${category.percentage}%`,
                                  borderRadius: 4,
                                  background: `linear-gradient(90deg, 
                                      ${alpha(
                                        getTypeColor(category.type),
                                        0.7
                                      )}, 
                                      ${getTypeColor(category.type)}
                                    )`,
                                  transition:
                                    "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                  boxShadow:
                                    category.percentage > 0
                                      ? `0 0 8px ${alpha(
                                          getTypeColor(category.type),
                                          0.4
                                        )}`
                                      : "none",
                                }}
                              />
                            </Box>
                          </Tooltip>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: isDarkMode
                                  ? color.gray400
                                  : color.gray600,
                              }}
                            >
                              {getLevelName(category.percentage)}
                            </Typography>

                            <Typography
                              variant="caption"
                              sx={{
                                color: isDarkMode
                                  ? color.gray400
                                  : color.gray600,
                                fontWeight: "medium",
                              }}
                            >
                              {category.completed}/{category.total}
                            </Typography>
                          </Box>
                        </Box>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}
