import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  Fade,
  Chip,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Route, RouteNodeEnum } from "interfaces";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RecommendIcon from "@mui/icons-material/Recommend";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";
import VocabularyIcon from "@mui/icons-material/MenuBook";
import GrammarIcon from "@mui/icons-material/AutoAwesomeMotion";
import ReadingIcon from "@mui/icons-material/ImportContacts";
import ListeningIcon from "@mui/icons-material/Headphones";
import WritingIcon from "@mui/icons-material/Edit";
import SpeakingIcon from "@mui/icons-material/RecordVoiceOver";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { alpha } from "@mui/material/styles";

interface RecommendationsTabProps {
  route: Route;
  process: number[];
}

export default function RecommendationsTab({
  route,
  process,
}: RecommendationsTabProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const uncompletedNodes = route.routeNodes.filter(
    (node) => !process.includes(node.id)
  );

  const nextLessons = [...uncompletedNodes]
    .sort((a, b) => a.serial - b.serial)
    .slice(0, 4);

  // Get node icon based on type
  const getNodeIcon = (nodeType: RouteNodeEnum) => {
    switch (nodeType) {
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
        return <ShuffleIcon fontSize="small" />;
      default:
        return <PlayArrowIcon fontSize="small" />;
    }
  };

  // Get node color based on type
  const getNodeColor = (nodeType: RouteNodeEnum) => {
    if (nodeType === RouteNodeEnum.MIXING_TEST) {
      return isDarkMode ? color.yellow400 : color.yellow600;
    } else if (nodeType.includes("TEST")) {
      return isDarkMode ? color.emerald400 : color.emerald600;
    }

    switch (nodeType) {
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

  // Navigate to a lesson
  const navigateToLesson = (node: any) => {
    let path = "";
    switch (node.type) {
      case "VOCABULARY":
        path = `/lesson/topics/${node.nodeId}`;
        break;
      case "GRAMMAR":
        path = `/lesson/grammars/${node.nodeId}`;
        break;
      case "READING":
        path = `/lesson/readings/${node.nodeId}`;
        break;
      case "LISTENING":
        path = `/lesson/listenings/${node.nodeId}`;
        break;
      case "WRITING":
        path = `/lesson/writings/${node.nodeId}`;
        break;
      case "SPEAKING":
        path = `/lesson/speakings/${node.nodeId}`;
        break;
      case "MIXING_TEST":
        path = `/test/mixing/${node.nodeId}`;
        break;
      case "READING_TEST":
        path = `/test/reading/${node.nodeId}`;
        break;
      case "LISTENING_TEST":
        path = `/test/listening/${node.nodeId}`;
        break;
      case "SPEAKING_TEST":
        path = `/test/speaking/${node.nodeId}`;
        break;
      case "WRITING_TEST":
        path = `/test/writing/${node.nodeId}`;
        break;
      default:
        path = "/";
    }
    navigate(path);
  };

  return (
    <Stack spacing={4}>
      {/* Personalized Recommendations Section */}
      <Paper
        elevation={isDarkMode ? 2 : 1}
        sx={{
          overflow: "hidden",
          borderRadius: "16px",
          bgcolor: isDarkMode ? color.gray900 : color.white,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          position: "relative",
        }}
      >
        {/* Decorative top gradient line */}
        <Box
          sx={{
            height: "4px",
            background: `linear-gradient(90deg, 
              ${isDarkMode ? color.teal500 : color.teal400}, 
              ${isDarkMode ? color.emerald400 : color.emerald500}
            )`,
          }}
        />

        <Box sx={{ p: { xs: 2, md: 3 } }}>
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
            <RecommendIcon
              sx={{ color: isDarkMode ? color.teal300 : color.teal500 }}
            />
            Personalized Recommendations
          </Typography>

          <Divider
            sx={{
              mb: 3,
              borderColor: isDarkMode ? color.gray700 : color.gray200,
            }}
          />

          {uncompletedNodes.length === 0 ? (
            <Fade in={true}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: "12px",
                  backgroundColor: isDarkMode
                    ? alpha(color.emerald900, 0.3)
                    : color.emerald50,
                  border: `1px solid ${
                    isDarkMode ? color.emerald800 : color.emerald100
                  }`,
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isDarkMode
                      ? alpha(color.emerald700, 0.7)
                      : color.emerald100,
                    color: isDarkMode ? color.emerald300 : color.emerald600,
                    flexShrink: 0,
                    boxShadow: `0 0 20px ${
                      isDarkMode
                        ? alpha(color.emerald700, 0.4)
                        : alpha(color.emerald300, 0.4)
                    }`,
                  }}
                >
                  <EmojiEventsIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: isDarkMode ? color.emerald300 : color.emerald700,
                      fontWeight: "bold",
                      mb: 0.5,
                    }}
                  >
                    Course Completed!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDarkMode ? color.emerald400 : color.emerald600,
                      lineHeight: 1.6,
                    }}
                  >
                    Congratulations! You've completed all lessons in this
                    learning path. Consider reviewing some lessons or exploring
                    other courses to continue your learning journey.
                  </Typography>
                </Box>
              </Box>
            </Fade>
          ) : (
            <Stack spacing={3}>
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray600,
                  mb: 1,
                }}
              >
                Based on your progress, we recommend focusing on these lessons
                next:
              </Typography>

              {nextLessons.map((node, index) => (
                <Fade
                  key={node.id}
                  in={true}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      border: `1px solid ${
                        isDarkMode ? color.gray700 : color.gray200
                      }`,
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: `0 12px 28px ${
                          isDarkMode
                            ? "rgba(0, 0, 0, 0.4)"
                            : alpha(getNodeColor(node.type), 0.2)
                        }`,
                      },
                      position: "relative",
                    }}
                  >
                    {/* Top gradient bar */}
                    <Box
                      sx={{
                        height: "6px",
                        background: `linear-gradient(90deg, 
                          ${alpha(getNodeColor(node.type), 0.7)}, 
                          ${getNodeColor(node.type)}
                        )`,
                      }}
                    />

                    <Box sx={{ p: 3 }}>
                      <Stack
                        direction="row"
                        spacing={2.5}
                        alignItems="flex-start"
                      >
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "14px",
                            backgroundColor: isDarkMode
                              ? alpha(getNodeColor(node.type), 0.2)
                              : alpha(getNodeColor(node.type), 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: getNodeColor(node.type),
                            flexShrink: 0,
                            border: `1px solid ${alpha(
                              getNodeColor(node.type),
                              0.3
                            )}`,
                            boxShadow: `0 4px 12px ${alpha(
                              getNodeColor(node.type),
                              0.15
                            )}`,
                          }}
                        >
                          {React.cloneElement(getNodeIcon(node.type), {
                            fontSize: "medium",
                          })}
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            flexWrap="wrap"
                            sx={{ mb: 1.5 }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: isDarkMode
                                  ? color.gray200
                                  : color.gray800,
                                fontWeight: "medium",
                              }}
                            >
                              {node.title}
                            </Typography>

                            <Chip
                              label={node.type.replace("_", " ")}
                              size="small"
                              sx={{
                                backgroundColor: isDarkMode
                                  ? alpha(getNodeColor(node.type), 0.15)
                                  : alpha(getNodeColor(node.type), 0.12),
                                color: getNodeColor(node.type),
                                borderRadius: "8px",
                                height: 26,
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                border: `1px solid ${alpha(
                                  getNodeColor(node.type),
                                  0.25
                                )}`,
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  backgroundColor: isDarkMode
                                    ? alpha(getNodeColor(node.type), 0.25)
                                    : alpha(getNodeColor(node.type), 0.18),
                                },
                              }}
                            />
                          </Stack>

                          {node.description && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: isDarkMode
                                  ? color.gray400
                                  : color.gray600,
                                mb: 2,
                                lineHeight: 1.6,
                              }}
                            >
                              {node.description}
                            </Typography>
                          )}

                          <Button
                            variant="contained"
                            size="medium"
                            onClick={() => navigateToLesson(node)}
                            endIcon={<PlayArrowIcon />}
                            sx={{
                              bgcolor: isDarkMode
                                ? alpha(getNodeColor(node.type), 0.2)
                                : alpha(getNodeColor(node.type), 0.15),
                              color: getNodeColor(node.type),
                              borderRadius: "10px",
                              textTransform: "none",
                              fontWeight: "bold",
                              px: 3,
                              py: 1,
                              border: `1px solid ${alpha(
                                getNodeColor(node.type),
                                0.3
                              )}`,
                              boxShadow: "none",
                              "&:hover": {
                                bgcolor: isDarkMode
                                  ? alpha(getNodeColor(node.type), 0.3)
                                  : alpha(getNodeColor(node.type), 0.25),
                                boxShadow: `0 6px 15px ${alpha(
                                  getNodeColor(node.type),
                                  0.25
                                )}`,
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            Start Lesson
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Paper>
                </Fade>
              ))}
            </Stack>
          )}
        </Box>
      </Paper>
    </Stack>
  );
}
