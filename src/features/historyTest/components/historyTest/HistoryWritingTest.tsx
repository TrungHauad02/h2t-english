import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import TestQuestionGridHistory from "./common/TestQuestionGridHistory";
import { TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useHistoryWritingTest from "../../hooks/useHistoryWritingTest";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GradingIcon from "@mui/icons-material/Grading";
import CommentIcon from "@mui/icons-material/Comment";

interface HistoryWritingTestProps {
  testWritingIds: number[];
  submitTestId: number;
}

export default function HistoryWritingTest({
  testWritingIds,
  submitTestId,
}: HistoryWritingTestProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const [expandedAccordions, setExpandedAccordions] = useState<
    Record<string, boolean>
  >({});

  const { loading, writingItems, allQuestions } = useHistoryWritingTest({
    testWritingIds,
    submitTestId,
  });

  useEffect(() => {
    if (selectedQuestionId) {
      // Expand the selected accordion
      setExpandedAccordions({
        [`panel-${selectedQuestionId}`]: true,
      });

      // Scroll to question
      const element = document.getElementById(`question-${selectedQuestionId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedQuestionId]);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordions((prev) => ({
        ...prev,
        [panel]: isExpanded,
      }));
    };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80)
      return isDarkMode ? color.emerald400 : color.emerald600;
    if (percentage >= 60) return isDarkMode ? color.teal400 : color.teal600;
    if (percentage >= 40) return isDarkMode ? color.warning : color.warning;
    return isDarkMode ? color.red400 : color.red600;
  };

  const getScoreLabel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Satisfactory";
    if (percentage >= 40) return "Needs Improvement";
    return "Insufficient";
  };

  const calculateMaxScore = (totalQuestions: number) => {
    // Total points for Writing is 100
    const sectionTotalPoints = 100;
    // Each question's max score is proportional to total questions
    return sectionTotalPoints / totalQuestions;
  };

  if (loading) {
    return (
      <Box
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 2,
          p: 3,
          bgcolor: isDarkMode ? color.gray800 : color.white,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <CircularProgress
          size={40}
          thickness={4}
          sx={{ color: isDarkMode ? color.teal400 : color.teal600 }}
        />
      </Box>
    );
  }

  if (writingItems.length === 0) {
    return (
      <Box
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: "1rem",
          p: 4,
          bgcolor: isDarkMode ? color.gray800 : color.white,
          textAlign: "center",
        }}
      >
        <Alert severity="info" sx={{ mb: 2 }}>
          No writing questions found
        </Alert>
        <Typography
          variant="body1"
          sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
        >
          Please check the test or submission ID.
        </Typography>
      </Box>
    );
  }

  // Calculate max score per question based on total questions
  const totalQuestions = writingItems.length;
  const maxScorePerQuestion = calculateMaxScore(totalQuestions);
  const totalMaxScore = 100; // Total writing score

  // Group items by title if possible
  const itemsByTitle: Record<string, any[]> = {};
  writingItems.forEach((item) => {
    const title = item.title || "Writing Test";
    if (!itemsByTitle[title]) {
      itemsByTitle[title] = [];
    }
    itemsByTitle[title].push(item);
  });

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        borderRadius: "1rem",
        width: "100%",
        p: { xs: 2, sm: 3 },
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={9} lg={8}>
          {Object.entries(itemsByTitle).map(([title, items]) => (
            <Box key={title} sx={{ mb: 4 }}>
              <Box
                sx={{
                  bgcolor: isDarkMode ? color.teal700 : color.teal500,
                  borderRadius: "8px 8px 0 0",
                  px: 3,
                  py: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: color.white,
                    fontWeight: 600,
                    fontSize: "1.5rem",
                  }}
                >
                  {title}
                </Typography>
                <Chip
                  label={`${items.length} Questions`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.25)",
                    color: color.white,
                    fontWeight: 500,
                    borderRadius: "16px",
                    px: 1,
                  }}
                />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  borderRadius: "0 0 8px 8px",
                  overflow: "hidden",
                  border: `1px solid ${
                    isDarkMode ? color.gray700 : color.gray200
                  }`,
                  borderTop: "none",
                }}
              >
                {items.map((item, index) => {
                  const isPanelExpanded =
                    expandedAccordions[`panel-${item.id}`] || false;
                  const matchingQuestion = allQuestions.find(
                    (q) => q.id === item.id
                  );
                  const serialNumber = matchingQuestion?.serial || index + 1;

                  return (
                    <Accordion
                      key={item.id}
                      id={`question-${item.id}`}
                      expanded={isPanelExpanded}
                      onChange={handleAccordionChange(`panel-${item.id}`)}
                      disableGutters
                      elevation={0}
                      sx={{
                        borderBottom:
                          index < items.length - 1
                            ? `1px solid ${
                                isDarkMode ? color.gray700 : color.gray200
                              }`
                            : "none",
                        "&:before": {
                          display: "none",
                        },
                        boxShadow:
                          selectedQuestionId === item.id
                            ? `0 0 10px ${
                                isDarkMode
                                  ? color.teal500 + "80"
                                  : color.teal400 + "80"
                              }`
                            : "none",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon
                            sx={{
                              color: isDarkMode ? color.teal200 : color.teal700,
                              fontSize: 24,
                            }}
                          />
                        }
                        sx={{
                          px: 3,
                          py: 1.5,
                          minHeight: "48px",
                          "& .MuiAccordionSummary-content": {
                            margin: "8px 0",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 1,
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: isDarkMode ? color.teal200 : color.teal700,
                            mr: 1,
                            fontSize: "1.1rem",
                          }}
                        >
                          Question {serialNumber}
                        </Typography>

                        {item.content && (
                          <Chip
                            icon={<AssignmentIcon fontSize="small" />}
                            label="Response Submitted"
                            size="small"
                            sx={{
                              bgcolor: isDarkMode
                                ? "rgba(94, 234, 212, 0.1)"
                                : "rgba(94, 234, 212, 0.2)",
                              color: isDarkMode ? color.teal200 : color.teal700,
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              borderRadius: "16px",
                            }}
                          />
                        )}

                        {item.score !== undefined && (
                          <Chip
                            icon={<GradingIcon fontSize="small" />}
                            label={`Score: ${item.score.toFixed(
                              1
                            )}/${maxScorePerQuestion.toFixed(1)}`}
                            size="small"
                            sx={{
                              bgcolor:
                                item.score > 0
                                  ? `${getScoreColor(
                                      item.score,
                                      maxScorePerQuestion
                                    )}20`
                                  : isDarkMode
                                  ? "rgba(239, 68, 68, 0.2)"
                                  : "rgba(239, 68, 68, 0.1)",
                              color:
                                item.score > 0
                                  ? getScoreColor(
                                      item.score,
                                      maxScorePerQuestion
                                    )
                                  : isDarkMode
                                  ? color.red400
                                  : color.red600,
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              borderRadius: "16px",
                            }}
                          />
                        )}

                        {item.comment && (
                          <Chip
                            icon={<CommentIcon fontSize="small" />}
                            label="Feedback"
                            size="small"
                            sx={{
                              bgcolor: isDarkMode
                                ? color.gray700
                                : color.gray100,
                              color: isDarkMode ? color.gray200 : color.gray800,
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              borderRadius: "16px",
                            }}
                          />
                        )}
                      </AccordionSummary>

                      <AccordionDetails sx={{ p: 0 }}>
                        {isPanelExpanded && (
                          <>
                            {/* Writing prompt */}
                            <Box
                              sx={{
                                bgcolor: isDarkMode
                                  ? color.gray700
                                  : color.gray50,
                                p: 3,
                                mx: 3,
                                mb: 3,
                                borderRadius: 1,
                                position: "relative",
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: 600,
                                  color: isDarkMode
                                    ? color.teal200
                                    : color.teal700,
                                  mb: 2,
                                }}
                              >
                                Writing Prompt
                              </Typography>

                              <Typography
                                variant="body1"
                                sx={{
                                  color: isDarkMode
                                    ? color.gray200
                                    : color.gray800,
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {item.topic}
                              </Typography>
                            </Box>

                            <Grid container spacing={2} sx={{ px: 3, mb: 3 }}>
                              {/* Written Response section */}
                              <Grid item xs={12}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 600,
                                    color: isDarkMode
                                      ? color.teal200
                                      : color.teal700,
                                    mb: 2,
                                    ml: 1,
                                  }}
                                >
                                  Your Response
                                </Typography>

                                <Box
                                  sx={{
                                    p: 3,
                                    bgcolor: isDarkMode
                                      ? color.gray800
                                      : color.white,
                                    border: `1px solid ${
                                      isDarkMode ? color.gray700 : color.gray200
                                    }`,
                                    borderRadius: 1,
                                    mb: item.comment ? 2 : 0,
                                    minHeight: "120px",
                                  }}
                                >
                                  {item.content ? (
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        color: isDarkMode
                                          ? color.gray200
                                          : color.gray800,
                                        whiteSpace: "pre-wrap",
                                        fontFamily: "monospace",
                                      }}
                                    >
                                      {item.content}
                                    </Typography>
                                  ) : (
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        color: isDarkMode
                                          ? color.gray400
                                          : color.gray500,
                                        fontStyle: "italic",
                                        textAlign: "center",
                                      }}
                                    >
                                      No response submitted
                                    </Typography>
                                  )}
                                </Box>

                                {item.comment && (
                                  <>
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: 600,
                                        color: isDarkMode
                                          ? color.teal200
                                          : color.teal700,
                                        mb: 2,
                                        ml: 1,
                                        mt: 2,
                                      }}
                                    >
                                      Teacher Feedback
                                    </Typography>

                                    <Box
                                      sx={{
                                        p: 3,
                                        bgcolor: isDarkMode
                                          ? color.gray800
                                          : color.white,
                                        border: `1px solid ${
                                          isDarkMode
                                            ? color.gray700
                                            : color.gray200
                                        }`,
                                        borderRadius: 1,
                                        minHeight: "80px",
                                      }}
                                    >
                                      <Typography
                                        variant="body1"
                                        sx={{
                                          color: isDarkMode
                                            ? color.gray300
                                            : color.gray700,
                                        }}
                                      >
                                        {item.comment}
                                      </Typography>
                                    </Box>
                                  </>
                                )}

                                {item.score !== undefined && (
                                  <>
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: 600,
                                        color: isDarkMode
                                          ? color.teal200
                                          : color.teal700,
                                        mb: 2,
                                        ml: 1,
                                        mt: 2,
                                      }}
                                    >
                                      Your Score
                                    </Typography>

                                    <Box
                                      sx={{
                                        p: 3,
                                        bgcolor: isDarkMode
                                          ? color.gray800
                                          : color.white,
                                        border: `1px solid ${
                                          isDarkMode
                                            ? color.gray700
                                            : color.gray200
                                        }`,
                                        borderRadius: 1,
                                        minHeight: "80px",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 2,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 60,
                                            height: 60,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            bgcolor: `${getScoreColor(
                                              item.score,
                                              maxScorePerQuestion
                                            )}20`,
                                            border: `2px solid ${getScoreColor(
                                              item.score,
                                              maxScorePerQuestion
                                            )}`,
                                            flexShrink: 0,
                                          }}
                                        >
                                          <Typography
                                            variant="h5"
                                            sx={{
                                              fontWeight: 600,
                                              color: getScoreColor(
                                                item.score,
                                                maxScorePerQuestion
                                              ),
                                            }}
                                          >
                                            {item.score.toFixed(1)}
                                          </Typography>
                                        </Box>

                                        <Box>
                                          <Typography
                                            variant="subtitle1"
                                            sx={{
                                              fontWeight: 600,
                                              color: getScoreColor(
                                                item.score,
                                                maxScorePerQuestion
                                              ),
                                              mb: 0.5,
                                            }}
                                          >
                                            {getScoreLabel(
                                              item.score,
                                              maxScorePerQuestion
                                            )}
                                          </Typography>

                                          <Typography
                                            variant="body2"
                                            sx={{
                                              color: isDarkMode
                                                ? color.gray300
                                                : color.gray700,
                                            }}
                                          >
                                            Score out of{" "}
                                            {maxScorePerQuestion.toFixed(1)}{" "}
                                            points (Total writing section:{" "}
                                            {totalMaxScore} points)
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </Grid>
                            </Grid>
                          </>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Paper>
            </Box>
          ))}
        </Grid>

        <Grid item md={3} lg={4} sx={{ display: { xs: "none", md: "block" } }}>
          <TestQuestionGridHistory
            questionItems={allQuestions.map((q) => ({
              serialNumber: q.serial,
              questionId: q.id,
              partType: TestPartTypeEnum.WRITING,
              isAnswered: q.isAnswered || false,
              isCorrect: false,
            }))}
            onQuestionSelect={(item) => setSelectedQuestionId(item.questionId)}
            isTitle
          />
        </Grid>

        {isSmallScreen && (
          <Grid item xs={12} sx={{ mt: 3 }}>
            <TestQuestionGridHistory
              questionItems={allQuestions.map((q) => ({
                serialNumber: q.serial,
                questionId: q.id,
                partType: TestPartTypeEnum.WRITING,
                isAnswered: q.isAnswered || false,
                isCorrect: false,
              }))}
              onQuestionSelect={(item) =>
                setSelectedQuestionId(item.questionId)
              }
              isTitle
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
