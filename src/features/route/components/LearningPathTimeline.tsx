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
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

export default function LearningPathTimeline({
  route,
}: LearningPathTimelineProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [expandedNodes, setExpandedNodes] = useState<{
    [key: number]: boolean;
  }>({});

  const cardBackgroundColor = isDarkMode ? color.gray700 : color.white;
  const cardBorderColor = isDarkMode ? color.gray600 : color.gray200;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

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
        bgcolor: cardBackgroundColor,
        border: `1px solid ${cardBorderColor}`,
        borderRadius: 4,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, borderBottom: `1px solid ${cardBorderColor}` }}>
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PlayCircleOutlineIcon />
            Learning Path
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              mt: 1,
            }}
          >
            {route.routeNodes.length} items to complete in this learning journey
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            px: { xs: 2, md: 3 },
            py: 1,
          }}
        >
          {/* Timeline connector line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: 21, md: 30 },
              top: 20,
              bottom: 20,
              width: 2,
              backgroundColor: isDarkMode ? color.gray600 : color.gray300,
              zIndex: 0,
            }}
          />

          {route.routeNodes.map((node, index) => {
            const nodeColor = getNodeColor(node.type);
            const isExpanded = expandedNodes[node.id] || false;

            return (
              <Box
                key={node.id}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  my: 1.5,
                }}
              >
                <Paper
                  elevation={isExpanded ? 3 : 1}
                  sx={{
                    backgroundColor: isExpanded
                      ? isDarkMode
                        ? color.gray800
                        : color.gray50
                      : isDarkMode
                      ? "transparent"
                      : color.white,
                    border: `1px solid ${
                      isExpanded
                        ? nodeColor
                        : isDarkMode
                        ? color.gray600
                        : color.gray300
                    }`,
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: nodeColor,
                      backgroundColor: isDarkMode
                        ? color.gray800
                        : color.gray50,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      p: { xs: 1.5, md: 2 },
                    }}
                  >
                    {/* Node dot with icon */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: { xs: 36, md: 44 },
                        height: { xs: 36, md: 44 },
                        borderRadius: "50%",
                        backgroundColor: nodeColor,
                        color: isDarkMode ? color.gray900 : color.white,
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      {getNodeIcon(node.type)}
                    </Box>

                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: textColor,
                            fontWeight: "bold",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                          }}
                        >
                          {node.title}
                        </Typography>

                        <Chip
                          label={node.type.replace("_", " ")}
                          size="small"
                          sx={{
                            backgroundColor: isDarkMode
                              ? "rgba(20, 184, 166, 0.1)"
                              : "rgba(20, 184, 166, 0.1)",
                            color: nodeColor,
                            borderRadius: 1,
                            height: 20,
                            fontSize: "0.7rem",
                          }}
                        />
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
                        variant="contained"
                        size={isMobile ? "small" : "medium"}
                        endIcon={<KeyboardArrowRightIcon />}
                        onClick={() => handleLearnClick(node)}
                        sx={{
                          bgcolor: nodeColor,
                          color: isDarkMode ? color.gray900 : color.white,
                          fontWeight: "600",
                          borderRadius: 2,
                          whiteSpace: "nowrap",
                          minWidth: { xs: "auto", md: "100px" },
                          px: { xs: 1.5, md: 2 },
                          "&:hover": {
                            bgcolor: isDarkMode
                              ? isTestNode(node.type)
                                ? color.emerald500
                                : color.teal400
                              : isTestNode(node.type)
                              ? color.emerald700
                              : color.teal700,
                          },
                        }}
                      >
                        {isMobile
                          ? "Start"
                          : isTestNode(node.type)
                          ? "Take Test"
                          : "Learn"}
                      </Button>

                      {node.description && (
                        <IconButton
                          size="small"
                          onClick={() => toggleNodeExpanded(node.id)}
                          sx={{
                            display: { xs: "flex", md: "none" },
                            color: secondaryTextColor,
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.2s ease-in-out",
                          }}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </Box>

                  {/* Mobile expanded section */}
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Divider
                      sx={{
                        borderColor: isDarkMode ? color.gray600 : color.gray300,
                      }}
                    />
                    <Box sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: secondaryTextColor,
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {node.description}
                      </Typography>
                    </Box>
                  </Collapse>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
