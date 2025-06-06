import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Collapse,
  Fade,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import TimeRemaining from "../common/TimeRemaining";
import SubmitTestDialogSingle from "../common/SubmitTestDialog";
import ConfirmSubmitDialog from "../mixingAndCompetition/ConfirmSubmitDialog";
import IntroducePartTest from "../mixingAndCompetition/InroducePartTest";
import TestQuestionGrid from "../mixingAndCompetition/TestQuestionGrid";
import { TestPartTypeEnum } from "interfaces";
import useReadingTest from "../../hooks/useReadingTest";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import { Test, SubmitTest } from "interfaces";
interface ReadingTestProps {
  testReadings: number[];
  submitTest: SubmitTest;
  test: Test;
}

export default function ReadingTest({
  testReadings,
  submitTest,
  test,
}: ReadingTestProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Tab state for mobile view
  const [tabValue, setTabValue] = useState(0);

  // State to track expanded reading passages
  const [readingExpandedMap, setReadingExpandedMap] = useState<
    Record<number, boolean>
  >({});

  const {
    questionsList,
    loading,
    error,
    allQuestions,
    isSubmitting,
    isSubmitDialogOpen,
    isConfirmDialogOpen,
    submissionResult,
    handleUpdateAnsweredQuestions,
    setQuestionRef,
    questionRefs,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleSubmitTest,
    closeSubmitDialog,
  } = useReadingTest(testReadings, submitTest.id, test.id);

  // Stats for confirm dialog and progress display
  const totalQuestions = allQuestions.length;
  const answeredQuestions = allQuestions.filter((q) => q.isAnswered).length;

  // Scroll to question if needed
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  // Initialize reading expanded states to true for all readings
  useEffect(() => {
    if (questionsList && questionsList.length > 0) {
      const initialExpandedState: Record<number, boolean> = {};
      questionsList.forEach((_, index) => {
        initialExpandedState[index] = true;
      });
      setReadingExpandedMap(initialExpandedState);
    }
  }, [questionsList]);

  useEffect(() => {
    if (selectedQuestionId && questionRefs.current[selectedQuestionId]) {
      questionRefs.current[selectedQuestionId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      // When selecting a question, switch to Questions tab on mobile
      if (isSmallScreen) {
        setTabValue(1);
      }
    }
  }, [selectedQuestionId, questionRefs, loading, isSmallScreen]);

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Toggle reading passage expand/collapse
  const toggleReading = (index: number) => {
    setReadingExpandedMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          p: 4,
          gap: 2,
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: isDarkMode ? color.emerald400 : color.emerald600,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 500,
          }}
        >
          Loading reading test...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        component={Paper}
        elevation={3}
        sx={{
          p: 4,
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          color: isDarkMode ? color.red500 : color.red600,
          mb: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6">Error loading reading test data</Typography>
        <Typography
          variant="body2"
          color={isDarkMode ? color.gray300 : color.gray600}
        >
          Please refresh the page or try again later
        </Typography>
      </Box>
    );
  }

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
      <IntroducePartTest type={TestPartTypeEnum.READING} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TimeRemaining
            createAt={
              submitTest?.createdAt
                ? new Date(submitTest.createdAt)
                : new Date()
            }
            duration={test.duration}
            onTimeUp={handleSubmitTest}
          />
        </Grid>

        {/* Main content */}
        <Grid item xs={12} md={9} lg={8}>
          {questionsList.map((readingItem, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                borderRadius: "1rem",
                overflow: "hidden",
                bgcolor: isDarkMode ? color.gray800 : color.white,
                mb: 4,
                boxShadow: isDarkMode
                  ? "0 8px 24px rgba(0,0,0,0.25)"
                  : "0 8px 24px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: isDarkMode
                    ? "0 10px 28px rgba(0,0,0,0.3)"
                    : "0 10px 28px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* Mobile tabs */}
              {isSmallScreen && (
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    backgroundColor: isDarkMode
                      ? color.gray700
                      : color.emerald50,
                    "& .MuiTabs-indicator": {
                      backgroundColor: isDarkMode
                        ? color.emerald400
                        : color.emerald600,
                      height: 3,
                    },
                    "& .MuiTab-root": {
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      transition: "all 0.2s ease",
                      py: 1.5,
                    },
                    "& .Mui-selected": {
                      color: isDarkMode ? color.emerald300 : color.emerald700,
                    },
                  }}
                >
                  <Tab
                    icon={<MenuBookIcon />}
                    label="Reading"
                    sx={{
                      color: isDarkMode ? color.gray300 : color.gray700,
                    }}
                  />
                  <Tab
                    icon={<QuizIcon />}
                    label="Questions"
                    sx={{
                      color: isDarkMode ? color.gray300 : color.gray700,
                    }}
                  />
                </Tabs>
              )}

              {/* Reading section */}
              <Box
                sx={{
                  p: { xs: 2, sm: 3 },
                  display: isSmallScreen && tabValue !== 0 ? "none" : "block",
                  borderBottom: "1px solid",
                  borderColor: isDarkMode ? color.gray700 : color.gray300,
                  background: isDarkMode
                    ? `linear-gradient(135deg, ${color.gray700} 0%, ${color.gray800} 100%)`
                    : `linear-gradient(135deg, ${color.emerald50} 0%, ${color.green50} 100%)`,
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
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: isDarkMode
                          ? "rgba(110, 231, 183, 0.15)"
                          : "rgba(16, 185, 129, 0.15)",
                      }}
                    >
                      <MenuBookIcon
                        sx={{
                          color: isDarkMode
                            ? color.emerald300
                            : color.emerald600,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: isDarkMode ? color.emerald200 : color.emerald700,
                      }}
                    >
                      Reading Passage {index + 1} of {questionsList.length}
                    </Typography>
                  </Box>

                  <Tooltip
                    title={readingExpandedMap[index] ? "Collapse" : "Expand"}
                  >
                    <IconButton
                      onClick={() => toggleReading(index)}
                      sx={{
                        color: isDarkMode ? color.emerald300 : color.emerald600,
                        backgroundColor: isDarkMode
                          ? "rgba(110, 231, 183, 0.1)"
                          : "rgba(16, 185, 129, 0.1)",
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? "rgba(110, 231, 183, 0.2)"
                            : "rgba(16, 185, 129, 0.2)",
                        },
                        transition: "all 0.3s ease",
                        transform: readingExpandedMap[index]
                          ? "rotate(0deg)"
                          : "rotate(180deg)",
                      }}
                    >
                      {readingExpandedMap[index] ? (
                        <KeyboardDoubleArrowUpIcon />
                      ) : (
                        <KeyboardDoubleArrowDownIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>

                <Collapse in={!!readingExpandedMap[index]} timeout="auto">
                  <Box
                    sx={{
                      mt: 2.5,
                      p: 2.5,
                      borderRadius: "1rem",
                      bgcolor: isDarkMode
                        ? "rgba(31, 41, 55, 0.8)"
                        : "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(8px)",
                      boxShadow: isDarkMode
                        ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                        : "0 4px 12px rgba(0, 0, 0, 0.1)",
                      height: isSmallScreen ? "60vh" : "70vh",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: isDarkMode ? color.gray800 : color.gray100,
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: isDarkMode ? color.gray600 : color.gray400,
                        borderRadius: "4px",
                        "&:hover": {
                          background: isDarkMode
                            ? color.gray500
                            : color.gray500,
                        },
                      },
                    }}
                  >
                    <WEDocumentViewer
                      fileUrl={readingItem.file}
                      lineHeight="2"
                      maxHeight="95%"
                    />
                  </Box>
                </Collapse>

                {!readingExpandedMap[index] && (
                  <Fade in={!readingExpandedMap[index]}>
                    <Box
                      sx={{
                        mt: 2,
                        p: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.5rem",
                        bgcolor: isDarkMode
                          ? "rgba(110, 231, 183, 0.1)"
                          : "rgba(16, 185, 129, 0.1)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDarkMode
                            ? color.emerald300
                            : color.emerald700,
                          fontWeight: 500,
                        }}
                      >
                        Click the button above to show reading passage
                      </Typography>
                    </Box>
                  </Fade>
                )}
              </Box>

              {/* Questions Section */}
              <Box
                sx={{
                  p: { xs: 2, sm: 3 },
                  display: isSmallScreen && tabValue !== 1 ? "none" : "block",
                  transition: "all 0.3s ease",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: isDarkMode
                          ? "rgba(94, 234, 212, 0.15)"
                          : "rgba(20, 184, 166, 0.15)",
                      }}
                    >
                      <QuizIcon
                        sx={{
                          color: isDarkMode ? color.teal300 : color.teal600,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: isDarkMode ? color.gray100 : color.gray900,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          color: isDarkMode ? color.teal400 : color.teal600,
                        }}
                      >
                        Questions {readingItem.startSerial}-
                        {readingItem.endSerial}
                      </Box>
                    </Typography>
                  </Box>

                  {/* Question range indication for desktop */}
                  {!isSmallScreen && (
                    <Tooltip title="Questions for this passage">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          px: 2,
                          py: 0.75,
                          borderRadius: "1rem",
                          bgcolor: isDarkMode ? color.gray700 : color.gray100,
                        }}
                      >
                        <BookmarkIcon
                          fontSize="small"
                          sx={{
                            mr: 1,
                            color: isDarkMode ? color.teal400 : color.teal600,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDarkMode ? color.gray300 : color.gray700,
                          }}
                        >
                          Questions {readingItem.startSerial}-
                          {readingItem.endSerial}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                </Box>

                <Divider
                  sx={{
                    mb: 3,
                    borderColor: isDarkMode ? color.gray700 : color.gray300,
                  }}
                />

                <AnswerQuestionSection
                  questions={readingItem.questions}
                  startSerial={readingItem.startSerial}
                  submitTestId={submitTest.id}
                  partId={readingItem.id}
                  selectedQuestionId={selectedQuestionId}
                  setQuestionRef={setQuestionRef}
                  setAnsweredQuestions={handleUpdateAnsweredQuestions}
                />
              </Box>
            </Paper>
          ))}
        </Grid>

        {/* Right sidebar with question grid for desktop */}
        <Grid
          item
          md={3}
          lg={4}
          sx={{
            display: { xs: "none", md: "block" },
            position: "sticky",
            top: 16,
            height: "fit-content",
            alignSelf: "flex-start",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                borderRadius: "1rem",
                backgroundColor: isDarkMode
                  ? "rgba(31, 41, 55, 0.7)"
                  : "rgba(255, 255, 255, 0.9)",
                boxShadow: isDarkMode
                  ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                  : "0 4px 12px rgba(0, 0, 0, 0.1)",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: isDarkMode ? color.teal300 : color.teal700,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <HelpOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                  Navigation
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray700,
                  mb: 1,
                }}
              >
                Use the grid below to navigate between questions. Click on a
                question number to jump to it.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    bgcolor: isDarkMode ? color.teal700 : color.teal600,
                    mr: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    mr: 2,
                    color: isDarkMode ? color.gray300 : color.gray600,
                  }}
                >
                  Answered
                </Typography>

                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    bgcolor: isDarkMode ? color.gray700 : color.gray300,
                    mr: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
                >
                  Not yet answered
                </Typography>
              </Box>
            </Paper>

            <TestQuestionGrid
              questionItems={allQuestions.map((q) => ({
                serialNumber: q.serialNumber,
                questionId: q.id,
                partType: TestPartTypeEnum.READING,
                isAnswered: q.isAnswered,
              }))}
              onQuestionSelect={(item) => {
                setSelectedQuestionId(item.questionId);
              }}
              onSubmitTest={handleOpenConfirmDialog}
              isTitle={true}
            />
          </Box>
        </Grid>

        {/* Mobile question grid at bottom */}
        {isSmallScreen && (
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <TestQuestionGrid
                questionItems={allQuestions.map((q) => ({
                  serialNumber: q.serialNumber,
                  questionId: q.id,
                  partType: TestPartTypeEnum.READING,
                  isAnswered: q.isAnswered,
                }))}
                onQuestionSelect={(item) => {
                  setSelectedQuestionId(item.questionId);
                }}
                onSubmitTest={handleOpenConfirmDialog}
                isTitle={true}
              />
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Sử dụng SubmitTestDialogSingle thay vì SubmitTestDialog */}
      <SubmitTestDialogSingle
        open={isSubmitDialogOpen}
        submitTestId={submitTest.id}
        onClose={closeSubmitDialog}
        isLoading={isSubmitting}
        result={submissionResult}
      />

      {/* Confirm Submit Dialog */}
      <ConfirmSubmitDialog
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleSubmitTest}
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
}
