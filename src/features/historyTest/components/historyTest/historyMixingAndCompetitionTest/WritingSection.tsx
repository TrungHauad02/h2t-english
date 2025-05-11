import { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import { testWritingService } from "services/test";
import {
  submitTestWritingService,
  submitCompetitionWritingService,
} from "services";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GradingIcon from "@mui/icons-material/Grading";
import CommentIcon from "@mui/icons-material/Comment";

interface WritingSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  startSerial: number;
  selectedQuestionId?: number | null;
  setQuestionRef?: (id: number, element: HTMLDivElement | null) => void;
  isCompetitionTest?: boolean;
}

export default function WritingSection({
  testItemIds,
  submitTestId,
  startSerial,
  selectedQuestionId,
  setQuestionRef,
  isCompetitionTest = false,
}: WritingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Record<number, any>>({});
  const [expandedAccordions, setExpandedAccordions] = useState<
    Record<string, boolean>
  >({});
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await testWritingService.getByIdsAndStatus(
          testItemIds,
          true
        );
        const testItems = res.data || [];
        setItems(testItems);

        const ids = testItems.map((item: any) => item.id);
        const submitRes = isCompetitionTest
          ? await submitCompetitionWritingService.findBySubmitCompetitionIdAndTestWritingIds(
              submitTestId,
              ids
            )
          : await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(
              submitTestId,
              ids
            );

        const map: Record<number, any> = {};
        for (const entry of submitRes.data || []) {
          const key = isCompetitionTest
            ? entry.CompetitionWriting_id
            : entry.testWriting_id;
          map[key] = entry;
        }
        setSubmissions(map);

        // Expand selected accordion if provided
        if (selectedQuestionId) {
          setExpandedAccordions({
            [`panel-${selectedQuestionId}`]: true,
          });
        }
      } catch (err) {
        console.error("Error fetching writing history:", err);
      } finally {
        setLoading(false);
      }
    }

    if (testItemIds.length > 0) {
      fetchData();
    }
  }, [testItemIds, submitTestId, isCompetitionTest, selectedQuestionId]);

  useEffect(() => {
    if (selectedQuestionId && questionRefs.current[selectedQuestionId]) {
      questionRefs.current[selectedQuestionId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
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
    // Total points for Writing is 100/6
    const sectionTotalPoints = 100 / 6;
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

  if (items.length === 0) {
    return (
      <Box
        component={Paper}
        elevation={2}
        sx={{
          p: 3,
          borderRadius: "1rem",
          bgcolor: isDarkMode ? color.gray800 : color.white,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
        >
          No writing questions found
        </Typography>
      </Box>
    );
  }

  // Group items by title
  const itemsByTitle: Record<string, any[]> = {};
  items.forEach((item) => {
    const title = item.title || "Writing Test";
    if (!itemsByTitle[title]) {
      itemsByTitle[title] = [];
    }
    itemsByTitle[title].push(item);
  });

  // Calculate continuous serial numbers
  let currentSerial = startSerial;
  const titleKeys = Object.keys(itemsByTitle);

  // Calculate max score per question based on total questions across all tests
  const totalQuestions = items.length;
  const maxScorePerQuestion = calculateMaxScore(totalQuestions);
  const totalMaxScore = 100 / 6; // Total writing section score

  return (
    <Box>
      {titleKeys.map((title) => {
        const questions = itemsByTitle[title];

        // Create an array to store the serial numbers for this test
        const serialNumbers = questions.map(() => {
          const serial = currentSerial;
          currentSerial++;
          return serial;
        });

        return (
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
                label={`${questions.length} Questions`}
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
              {questions.map((item, index) => {
                const submission = submissions[item.id] || {};
                const isPanelExpanded =
                  expandedAccordions[`panel-${item.id}`] || false;
                const questionSerial = serialNumbers[index];
                const hasScore = submission.score !== undefined;

                return (
                  <Accordion
                    key={item.id}
                    expanded={isPanelExpanded}
                    onChange={handleAccordionChange(`panel-${item.id}`)}
                    disableGutters
                    elevation={0}
                    ref={(el) => {
                      if (el) {
                        questionRefs.current[item.id] = el;
                        setQuestionRef && setQuestionRef(item.id, el);
                      }
                    }}
                    sx={{
                      borderBottom:
                        index < questions.length - 1
                          ? `1px solid ${
                              isDarkMode ? color.gray700 : color.gray200
                            }`
                          : "none",
                      "&:before": {
                        display: "none",
                      },
                      scrollMarginTop: "100px",
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
                        Question {questionSerial}
                      </Typography>

                      {submission.content && (
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

                      {hasScore && (
                        <Chip
                          icon={<GradingIcon fontSize="small" />}
                          label={`Score: ${submission.score.toFixed(
                            1
                          )}/${maxScorePerQuestion.toFixed(1)}`}
                          size="small"
                          sx={{
                            bgcolor:
                              submission.score > 0
                                ? `${getScoreColor(
                                    submission.score,
                                    maxScorePerQuestion
                                  )}20`
                                : isDarkMode
                                ? "rgba(239, 68, 68, 0.2)"
                                : "rgba(239, 68, 68, 0.1)",
                            color:
                              submission.score > 0
                                ? getScoreColor(
                                    submission.score,
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

                      {submission.comment && (
                        <Chip
                          icon={<CommentIcon fontSize="small" />}
                          label="Feedback"
                          size="small"
                          sx={{
                            bgcolor: isDarkMode ? color.gray700 : color.gray100,
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
                          {/* Question content */}
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
                            {/* Result section */}
                            <Grid item xs={12} md={hasScore ? 4 : 0}>
                              {hasScore && (
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
                                    }}
                                  >
                                    Your Result
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
                                      height: "100%",
                                      minHeight: "120px",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                      }}
                                    >
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          color: getScoreColor(
                                            submission.score || 0,
                                            maxScorePerQuestion
                                          ),
                                          mb: 1.5,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {getScoreLabel(
                                          submission.score || 0,
                                          maxScorePerQuestion
                                        )}
                                      </Typography>

                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          mb: 2,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            position: "relative",
                                            width: 80,
                                            height: 80,
                                            mr: 2,
                                          }}
                                        >
                                          <CircularProgress
                                            variant="determinate"
                                            value={100}
                                            size={80}
                                            thickness={4}
                                            sx={{
                                              color: isDarkMode
                                                ? "rgba(255,255,255,0.1)"
                                                : "rgba(0,0,0,0.05)",
                                              position: "absolute",
                                            }}
                                          />
                                          <CircularProgress
                                            variant="determinate"
                                            value={
                                              (submission.score /
                                                maxScorePerQuestion) *
                                              100
                                            }
                                            size={80}
                                            thickness={4}
                                            sx={{
                                              color: getScoreColor(
                                                submission.score || 0,
                                                maxScorePerQuestion
                                              ),
                                              position: "absolute",
                                            }}
                                          />
                                          <Box
                                            sx={{
                                              textAlign: "center",
                                              position: "absolute",
                                              top: "50%",
                                              left: "50%",
                                              transform:
                                                "translate(-50%, -50%)",
                                            }}
                                          >
                                            <Typography
                                              variant="h5"
                                              sx={{
                                                fontWeight: 600,
                                                color: getScoreColor(
                                                  submission.score || 0,
                                                  maxScorePerQuestion
                                                ),
                                                lineHeight: 1,
                                              }}
                                            >
                                              {submission.score
                                                ? submission.score.toFixed(1)
                                                : "0"}
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{
                                                color: isDarkMode
                                                  ? color.gray400
                                                  : color.gray600,
                                                display: "block",
                                                fontSize: "0.7rem",
                                                mt: -0.5,
                                              }}
                                            >
                                              /{maxScorePerQuestion.toFixed(1)}
                                            </Typography>
                                          </Box>
                                        </Box>

                                        <Box sx={{ flex: 1 }}>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              color: isDarkMode
                                                ? color.gray300
                                                : color.gray700,
                                              mb: 0.5,
                                            }}
                                          >
                                            Writing section total:{" "}
                                            {totalMaxScore.toFixed(1)} points
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              color: isDarkMode
                                                ? color.gray400
                                                : color.gray600,
                                              fontSize: "0.8rem",
                                            }}
                                          >
                                            Each question:{" "}
                                            {maxScorePerQuestion.toFixed(1)}{" "}
                                            points
                                          </Typography>
                                        </Box>
                                      </Box>

                                      <Typography
                                        variant="body1"
                                        sx={{
                                          color: isDarkMode
                                            ? color.gray300
                                            : color.gray700,
                                        }}
                                      >
                                        This score contributes to your overall
                                        writing assessment.
                                      </Typography>
                                    </Box>
                                  </Box>
                                </>
                              )}
                            </Grid>

                            {/* Response section */}
                            <Grid item xs={12} md={hasScore ? 8 : 12}>
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
                                  mb: submission.comment ? 2 : 0,
                                  minHeight: "120px",
                                }}
                              >
                                {submission.content ? (
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color: isDarkMode
                                        ? color.gray200
                                        : color.gray800,
                                      whiteSpace: "pre-wrap",
                                    }}
                                  >
                                    {submission.content}
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

                              {submission.comment && (
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
                                      {submission.comment}
                                    </Typography>
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
        );
      })}
    </Box>
  );
}
