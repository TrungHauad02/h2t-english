import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
  Fade,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import VocabularyIcon from "@mui/icons-material/MenuBook";
import GrammarIcon from "@mui/icons-material/AutoAwesomeMotion";
import ReadingIcon from "@mui/icons-material/ImportContacts";
import ListeningIcon from "@mui/icons-material/Headphones";
import WritingIcon from "@mui/icons-material/Edit";
import SpeakingIcon from "@mui/icons-material/RecordVoiceOver";
import TestIcon from "@mui/icons-material/Quiz";
import { Route, RouteNode, RouteNodeEnum } from "interfaces";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface LearningPathTimelineProps {
  route: Route;
}

const AnimatedNodeIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "scale(1.1) rotate(5deg)",
  },
}));

export default function LearningPathTimeline({
  route,
}: LearningPathTimelineProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [expandedNodes, setExpandedNodes] = useState<{
    [key: number]: boolean;
  }>({});

  const sortedNodes = route.routeNodes.sort((a, b) => a.serial - b.serial);

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const cardGradient = isDarkMode
    ? `linear-gradient(145deg, ${color.gray800}, ${color.gray900})`
    : `linear-gradient(145deg, ${color.white}, ${color.gray50})`;

  const toggleNodeExpanded = (nodeId: number) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const getNodeIcon = (nodeType: RouteNodeEnum) => {
    switch (nodeType) {
      case RouteNodeEnum.VOCABULARY:
        return <VocabularyIcon />;
      case RouteNodeEnum.GRAMMAR:
        return <GrammarIcon />;
      case RouteNodeEnum.READING:
      case RouteNodeEnum.READING_TEST:
        return <ReadingIcon />;
      case RouteNodeEnum.LISTENING:
      case RouteNodeEnum.LISTENING_TEST:
        return <ListeningIcon />;
      case RouteNodeEnum.WRITING:
      case RouteNodeEnum.WRITING_TEST:
        return <WritingIcon />;
      case RouteNodeEnum.SPEAKING:
      case RouteNodeEnum.SPEAKING_TEST:
        return <SpeakingIcon />;
      case RouteNodeEnum.MIXING_TEST:
        return <TestIcon />;
      default:
        return <KeyboardArrowRightIcon />;
    }
  };

  const getNodeColor = (nodeType: RouteNodeEnum) => {
    if (nodeType.includes("TEST")) {
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

  const handleLearnClick = (node: RouteNode) => {
    let path = "";
    switch (node.type) {
      case RouteNodeEnum.VOCABULARY:
        path = `/lesson/topics/${node.nodeId}`;
        break;
      case RouteNodeEnum.GRAMMAR:
        path = `/lesson/grammars/${node.nodeId}`;
        break;
      case RouteNodeEnum.READING:
        path = `/lesson/readings/${node.nodeId}`;
        break;
      case RouteNodeEnum.LISTENING:
        path = `/lesson/listenings/${node.nodeId}`;
        break;
      case RouteNodeEnum.WRITING:
        path = `/lesson/writings/${node.nodeId}`;
        break;
      case RouteNodeEnum.SPEAKING:
        path = `/lesson/speakings/${node.nodeId}`;
        break;
      case RouteNodeEnum.MIXING_TEST:
        path = `/test/mixing/${node.nodeId}`;
        break;
      case RouteNodeEnum.READING_TEST:
        path = `/test/reading/${node.nodeId}`;
        break;
      case RouteNodeEnum.LISTENING_TEST:
        path = `/test/listening/${node.nodeId}`;
        break;
      case RouteNodeEnum.SPEAKING_TEST:
        path = `/test/speaking/${node.nodeId}`;
        break;
      case RouteNodeEnum.WRITING_TEST:
        path = `/test/writing/${node.nodeId}`;
        break;
      default:
        path = "/";
    }
    navigate(path);
  };

  const isTestNode = (type: RouteNodeEnum) => {
    return type.includes("TEST");
  };

  return (
    <Card
      sx={{
        background: cardGradient,
        border: `1px solid ${isDarkMode ? color.teal900 : color.teal100}`,
        borderRadius: "24px",
        boxShadow: isDarkMode
          ? "0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(14, 165, 143, 0.1)"
          : "0 10px 30px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(14, 165, 143, 0.1)",
        overflow: "hidden",
        backdropFilter: "blur(10px)",
        position: "relative",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? color.teal900 : color.teal50
          } 0%, transparent 70%)`,
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      <CardContent sx={{ p: 0, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            p: 3,
            borderBottom: `1px solid ${
              isDarkMode ? color.gray700 : color.gray200
            }`,
            position: "relative",
            overflow: "hidden",
            background: isDarkMode
              ? `linear-gradient(90deg, ${color.gray800} 0%, ${color.gray900} 100%)`
              : `linear-gradient(90deg, ${color.white} 0%, ${color.gray50} 100%)`,
          }}
        >
          {/* Header decorative element */}
          <Box
            sx={{
              position: "absolute",
              top: -30,
              left: -30,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${
                isDarkMode ? color.teal800 : color.teal100
              } 0%, transparent 70%)`,
              opacity: 0.6,
              zIndex: 0,
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: isDarkMode ? color.teal300 : color.teal600,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <PlayCircleOutlineIcon fontSize="large" />
                Learning Path
                <Chip
                  label={route.routeNodes.length}
                  size="small"
                  sx={{
                    backgroundColor: isDarkMode ? color.teal900 : color.teal50,
                    color: isDarkMode ? color.teal200 : color.teal700,
                    fontWeight: "bold",
                    ml: 1,
                  }}
                />
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            px: { xs: 2, md: 3 },
            py: 3,
          }}
        >
          {/* Timeline connector line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: 21, md: 30 },
              top: 20,
              bottom: 20,
              width: 3,
              background: isDarkMode
                ? `linear-gradient(to bottom, ${color.teal700}, ${color.gray700})`
                : `linear-gradient(to bottom, ${color.teal300}, ${color.gray300})`,
              borderRadius: 4,
              zIndex: 0,
            }}
          />

          {sortedNodes.map((node, index) => {
            const nodeColor = getNodeColor(node.type);
            const isExpanded = expandedNodes[node.id] || false;

            return (
              <Zoom
                key={node.id}
                in={true}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transformOrigin: "left center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    my: 1.5,
                  }}
                >
                  <Paper
                    elevation={isExpanded ? 8 : 2}
                    sx={{
                      background: isDarkMode ? color.gray800 : color.white,
                      border: `2px solid ${
                        isDarkMode ? color.teal800 : color.teal200
                      }`,
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        borderColor: nodeColor,
                        transform: "scale(1.02)",
                        boxShadow: `0 8px 20px rgba(${
                          isDarkMode
                            ? "0,0,0,0.5"
                            : nodeColor === color.teal600
                            ? "20,184,166,0.2"
                            : "0,0,0,0.15"
                        })`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        p: { xs: 2, md: 2.5 },
                      }}
                    >
                      {/* Node dot with icon */}
                      <Box
                        sx={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: { xs: 40, md: 48 },
                          height: { xs: 40, md: 48 },
                          borderRadius: "50%",
                          backgroundColor: nodeColor,
                          color: isDarkMode ? color.gray900 : color.white,
                          mr: 3,
                          flexShrink: 0,
                        }}
                      >
                        <AnimatedNodeIcon>
                          {getNodeIcon(node.type)}
                        </AnimatedNodeIcon>
                      </Box>

                      <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          flexWrap="wrap"
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: textColor,
                              fontWeight: "medium",
                              fontSize: {
                                xs: "0.9rem",
                                md: "1rem",
                              },
                            }}
                          >
                            {node.title}
                          </Typography>

                          <Fade in={true}>
                            <Chip
                              label={node.type.replace("_", " ")}
                              size="small"
                              sx={{
                                backgroundColor: isDarkMode
                                  ? `${nodeColor}22` // 22 is hex for 13% opacity
                                  : `${nodeColor}15`, // 15 is hex for 8% opacity
                                color: nodeColor,
                                borderRadius: "12px",
                                height: 24,
                                fontSize: "0.7rem",
                                fontWeight: "bold",
                                border: `1px solid ${nodeColor}33`, // 33 is hex for 20% opacity
                              }}
                            />
                          </Fade>
                        </Stack>

                        {node.description && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: secondaryTextColor,
                              mt: 0.5,
                              fontSize: { xs: "0.8rem", md: "0.875rem" },
                              lineHeight: 1.5,
                              display: isExpanded
                                ? "block"
                                : {
                                    xs: "none",
                                    md: "-webkit-box",
                                  },
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {node.description}
                          </Typography>
                        )}
                      </Box>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          endIcon={<KeyboardArrowRightIcon />}
                          onClick={() => handleLearnClick(node)}
                          sx={{
                            bgcolor: "transparent",
                            color: nodeColor,
                            border: `2px solid ${nodeColor}`,
                            fontWeight: "600",
                            borderRadius: "12px",
                            whiteSpace: "nowrap",
                            minWidth: { xs: "auto", md: "100px" },
                            px: { xs: 1.5, md: 2 },
                            py: { xs: 0.5, md: 0.8 },
                            textTransform: "none",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: `${nodeColor}22`,
                              borderColor: nodeColor,
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          {isSmall
                            ? "Start"
                            : isTestNode(node.type)
                            ? "Take Test"
                            : "Learn Now"}
                        </Button>

                        {node.description && (
                          <IconButton
                            size="small"
                            onClick={() => toggleNodeExpanded(node.id)}
                            sx={{
                              backgroundColor: isDarkMode
                                ? color.gray700
                                : color.gray100,
                              color: secondaryTextColor,
                              transform: isExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.2s ease-in-out",
                              width: 32,
                              height: 32,
                              "&:hover": {
                                backgroundColor: isDarkMode
                                  ? color.gray600
                                  : color.gray200,
                              },
                            }}
                          >
                            <ExpandMoreIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Stack>
                    </Box>

                    {/* Expanded section */}
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Divider
                        sx={{
                          borderColor: isDarkMode
                            ? color.gray600
                            : color.gray200,
                        }}
                      />
                      <Box
                        sx={{
                          p: 3,
                          background: isDarkMode
                            ? `linear-gradient(145deg, ${color.gray800} 0%, ${color.gray900} 100%)`
                            : `linear-gradient(145deg, ${color.gray50} 0%, ${color.white} 100%)`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: secondaryTextColor,
                            fontSize: "0.9rem",
                            lineHeight: 1.6,
                            mb: 2,
                          }}
                        >
                          {node.description}
                        </Typography>
                      </Box>
                    </Collapse>
                  </Paper>
                </Box>
              </Zoom>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
