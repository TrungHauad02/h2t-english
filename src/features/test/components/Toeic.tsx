import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, alpha, Fade, Button, Slider, CircularProgress } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import TimerIcon from "@mui/icons-material/Timer";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useToeicPage from "../hooks/useToeicTest";
import { 
  submitToeicPart1Service, 
  submitToeicPart2Service, 
  submitToeicAnswerService,
  toeicPart3_4Service,
  toeicPart6Service,
  toeicPart7Service
} from "services";

import VolumeTestStep from "./toeic/introduce/VolumeTestStep";
import DirectionsStep from "./toeic/introduce/DirectionsStep";
import ListeningPart1Step from "./toeic/part1/ListeningPart1Step";
import ListeningPart1List from "./toeic/part1/ListeningPart1List";
import ListeningPart2List from "./toeic/part2/ListeningPart2List";
import ListeningPart3And4List from "./toeic/part3And4/ListeningPart3And4List";
import Part5List from "./toeic/part5/Part5List";
import Part6List from "./toeic/part6/Part6List";
import Part7List from "./toeic/part7/Part7List";
import ConfirmSubmitDialog from "./common/ConfirmSubmitDialog";
import ToeicSubmitTestDialog from "./common/ToeicSubmitTestDialog";
import QuestionNavigator from "./toeic/QuestionNavigator";
import { ToeicPart6 } from "interfaces";

const ToeicTest: React.FC = () => {
  const {
    toeic,
    submitToeic,
    loading,
    error,
    totalAnswered,
    resumePosition,
    calculateTotalAnswered,
    submitToeicTest,
    resetAllAnswers,
  } = useToeicPage();

  const [volume, setVolume] = useState(50);
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [hasResumed, setHasResumed] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Update answered questions khi có thay đổi
  useEffect(() => {
    const updateAnsweredQuestions = async () => {
      if (submitToeic?.id && toeic) {
        try {
          const answeredList = await getAnsweredQuestionNumbersFromToeic();
          setAnsweredQuestions(new Set(answeredList));
        } catch (error) {
          console.error("Error fetching answered questions:", error);
        }
      }
    };

    updateAnsweredQuestions();
  }, [totalAnswered, submitToeic?.id, toeic]); // Listen to totalAnswered changes from useToeicPage

  // Sử dụng lại logic từ useToeicTest để tính answered questions
  const getAnsweredQuestionNumbersFromToeic = async (): Promise<number[]> => {
    if (!submitToeic?.id || !toeic) return [];
    
    try {
      const answeredList: number[] = [];

      // Part 1
      if (toeic.questionsPart1?.length) {
        const part1Answers = await submitToeicPart1Service.findBySubmitToeicIdAndToeicPart1Ids(
          submitToeic.id,
          toeic.questionsPart1
        );
        if (part1Answers?.data?.length) {
          part1Answers.data.forEach((answer: any) => {
            const questionIndex = toeic.questionsPart1!.indexOf(answer.toeicPart1Id);
            if (questionIndex !== -1) {
              answeredList.push(1 + questionIndex);
            }
          });
        }
      }

      // Part 2
      if (toeic.questionsPart2?.length) {
        const part2Answers = await submitToeicPart2Service.findBySubmitToeicIdAndToeicPart2Ids(
          submitToeic.id,
          toeic.questionsPart2
        );
        if (part2Answers?.data?.length) {
          part2Answers.data.forEach((answer: any) => {
            const questionIndex = toeic.questionsPart2!.indexOf(answer.toeicPart2Id);
            if (questionIndex !== -1) {
              answeredList.push(7 + questionIndex);
            }
          });
        }
      }

      // Part 3
      if (toeic.questionsPart3?.length) {
        const toeicPart3Res = await toeicPart3_4Service.getByIdsAndStatus(toeic.questionsPart3, true);
        const toeicPart3Data = Array.isArray(toeicPart3Res?.data) ? toeicPart3Res.data : [];
        
        const part3QuestionIds: number[] = [];
        for (const part3 of toeicPart3Data) {
          if (part3.questions?.length) {
            part3QuestionIds.push(...part3.questions);
          }
        }
        
        if (part3QuestionIds.length) {
          const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeic.id,
            part3QuestionIds
          );
          if (answers?.data?.length) {
            answers.data.forEach((answer: any) => {
              const questionIndex = part3QuestionIds.indexOf(answer.toeicQuestionId);
              if (questionIndex !== -1) {
                answeredList.push(32 + questionIndex);
              }
            });
          }
        }
      }

      // Part 4
      if (toeic.questionsPart4?.length) {
        const toeicPart4Res = await toeicPart3_4Service.getByIdsAndStatus(toeic.questionsPart4, true);
        const toeicPart4Data = Array.isArray(toeicPart4Res?.data) ? toeicPart4Res.data : [];
        
        const part4QuestionIds: number[] = [];
        for (const part4 of toeicPart4Data) {
          if (part4.questions?.length) {
            part4QuestionIds.push(...part4.questions);
          }
        }
        
        if (part4QuestionIds.length) {
          const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeic.id,
            part4QuestionIds
          );
          if (answers?.data?.length) {
            answers.data.forEach((answer: any) => {
              const questionIndex = part4QuestionIds.indexOf(answer.toeicQuestionId);
              if (questionIndex !== -1) {
                answeredList.push(71 + questionIndex);
              }
            });
          }
        }
      }

      // Part 5
      if (toeic.questionsPart5?.length) {
        const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
          submitToeic.id,
          toeic.questionsPart5
        );
        if (answers?.data?.length) {
          answers.data.forEach((answer: any) => {
            const questionIndex = toeic.questionsPart5!.indexOf(answer.toeicQuestionId);
            if (questionIndex !== -1) {
              answeredList.push(101 + questionIndex);
            }
          });
        }
      }

      // Part 6
      if (toeic.questionsPart6?.length) {
        const toeicPart6Res = await toeicPart6Service.getByIdsAndStatus(toeic.questionsPart6, true);
        const toeicPart6Data = Array.isArray(toeicPart6Res?.data) ? toeicPart6Res.data : [];
        
        const part6QuestionIds: number[] = [];
        for (const part6 of toeicPart6Data) {
          if (part6.questions?.length) {
            part6QuestionIds.push(...part6.questions);
          }
        }
        
        if (part6QuestionIds.length) {
          const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeic.id,
            part6QuestionIds
          );
          if (answers?.data?.length) {
            answers.data.forEach((answer: any) => {
              const questionIndex = part6QuestionIds.indexOf(answer.toeicQuestionId);
              if (questionIndex !== -1) {
                answeredList.push(131 + questionIndex);
              }
            });
          }
        }
      }

      // Part 7
      if (toeic.questionsPart7?.length) {
        const toeicPart7Res = await toeicPart7Service.getByIdsAndStatus(toeic.questionsPart7, true);
        const toeicPart7Data = Array.isArray(toeicPart7Res?.data) ? toeicPart7Res.data : [];
        
        const part7QuestionIds: number[] = [];
        for (const part7 of toeicPart7Data) {
          if (part7.questions?.length) {
            part7QuestionIds.push(...part7.questions);
          }
        }
        
        if (part7QuestionIds.length) {
          const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeic.id,
            part7QuestionIds
          );
          if (answers?.data?.length) {
            answers.data.forEach((answer: any) => {
              const questionIndex = part7QuestionIds.indexOf(answer.toeicQuestionId);
              if (questionIndex !== -1) {
                answeredList.push(147 + questionIndex);
              }
            });
          }
        }
      }

      return [...new Set(answeredList)]; // Remove duplicates
    } catch (error) {
      console.error("Error fetching answered questions:", error);
      return [];
    }
  };

  useEffect(() => {
    if (resumePosition && !hasResumed && toeic && submitToeic) {
      if (resumePosition.step > 0) {
        setShowResumeDialog(true);
      } else {
        setHasResumed(true);
      }
    }
  }, [resumePosition, hasResumed, toeic, submitToeic]);

  const handleResumeChoice = async (shouldResume: boolean) => {
    if (!shouldResume) {
      setIsResetting(true);
      
      try {
        const resetSuccess = await resetAllAnswers();
        
        if (resetSuccess) {
          console.log("Successfully reset all answers");
          setStep(0);
          setCurrentIndex(0);
          setCountdown(null);
        } else {
          console.error("Failed to reset answers");
        }
      } catch (error) {
        console.error("Error during reset:", error);
      } finally {
        setIsResetting(false);
      }
    } else if (shouldResume && resumePosition) {
      setStep(resumePosition.step);
      setCurrentIndex(resumePosition.currentIndex);
    }
    
    setShowResumeDialog(false);
    setHasResumed(true);
  };

  useEffect(() => {
    if (step === 7) {
      setCountdown(75 * 60);
    }
  }, [step]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev ? prev - 1 : null));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmitTest = useCallback(async () => {
    if (!submitToeic?.id) return;

    try {
      setIsSubmitting(true);
      setIsConfirmDialogOpen(false);
      setIsSubmitDialogOpen(true);

      const result = await submitToeicTest();

      setSubmissionResult(result);
    } catch (error) {
      console.error("Error submitting TOEIC test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [submitToeic, submitToeicTest]);

  const handleSubmitClick = async () => {
    await calculateTotalAnswered();
    setIsConfirmDialogOpen(true);
  };

  const closeSubmitDialog = useCallback(() => {
    setIsSubmitDialogOpen(false);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const getSectionTitle = () => {
    switch (step) {
      case 3:
        return "LISTENING PART 1";
      case 4:
        return "LISTENING PART 2";
      case 5:
        return "LISTENING PART 3";
      case 6:
        return "LISTENING PART 4";
      case 7:
        return "READING PART 5";
      case 8:
        return "READING PART 6";
      case 9:
        return "READING PART 7";
      default:
        return "";
    }
  };

  const getTotalCurrentPartItems = () => {
    if (!toeic) return 0;
    switch (step) {
      case 3:
        return toeic.questionsPart1?.length ?? 0;
      case 4:
        return toeic.questionsPart2?.length ?? 0;
      case 5:
        return toeic.questionsPart3?.length ?? 0;
      case 6:
        return toeic.questionsPart4?.length ?? 0;
      case 7:
        return toeic.questionsPart5?.length ?? 0;
      case 8:
        return toeic.questionsPart6?.length ?? 0;
      case 9:
        return toeic.questionsPart7?.length ?? 0;
      default:
        return 0;
    }
  };

  const canGoNext = () => {
    const total = getTotalCurrentPartItems();
    return step < 9 || currentIndex < total - 1;
  };

  const canGoPrevious = () => {
    // For listening parts (3-6), allow going back within the part
    if (step >= 3 && step <= 6) {
      return currentIndex > 0 || step > 3;
    }
    // For reading parts (7-9), allow going back within the part or to previous parts
    return step > 7 || (step === 7 && currentIndex > 0);
  };

  const nextQuestion = () => {
    const total = getTotalCurrentPartItems();

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (step < 9) {
      setStep((prev) => prev + 1);
      setCurrentIndex(0);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (step > 3) {
      setStep((prev) => prev - 1);
      // Get the length of the previous part
      let previousPartTotal = 0;
      switch (step - 1) {
        case 3:
          previousPartTotal = toeic?.questionsPart1?.length ?? 0;
          break;
        case 4:
          previousPartTotal = toeic?.questionsPart2?.length ?? 0;
          break;
        case 5:
          previousPartTotal = toeic?.questionsPart3?.length ?? 0;
          break;
        case 6:
          previousPartTotal = toeic?.questionsPart4?.length ?? 0;
          break;
        case 7:
          previousPartTotal = toeic?.questionsPart5?.length ?? 0;
          break;
        case 8:
          previousPartTotal = toeic?.questionsPart6?.length ?? 0;
          break;
        default:
          previousPartTotal = 0;
      }
      setCurrentIndex(previousPartTotal - 1);
    }
  };

  // Navigate to specific question number
  const handleNavigateToQuestion = async (questionNumber: number) => {
    let targetStep = 3;
    let targetIndex = 0;

    if (questionNumber >= 1 && questionNumber <= 6) {
      // Part 1
      targetStep = 3;
      targetIndex = questionNumber - 1;
    } else if (questionNumber >= 7 && questionNumber <= 31) {
      // Part 2
      targetStep = 4;
      targetIndex = questionNumber - 7;
    } else if (questionNumber >= 32 && questionNumber <= 70) {
      // Part 3
      targetStep = 5;
      targetIndex = Math.floor((questionNumber - 32) / 3);
    } else if (questionNumber >= 71 && questionNumber <= 100) {
      // Part 4
      targetStep = 6;
      targetIndex = Math.floor((questionNumber - 71) / 3);
    } else if (questionNumber >= 101 && questionNumber <= 130) {
      // Part 5
      targetStep = 7;
      targetIndex = questionNumber - 101;
    } else if (questionNumber >= 131 && questionNumber <= 146) {
      // Part 6 - calculate based on actual passage structure
      targetStep = 8;
      try {
        if (toeic?.questionsPart6?.length) {
          const toeicPart6Res = await toeicPart6Service.getByIdsAndStatus(toeic.questionsPart6, true);
          const toeicPart6Data = Array.isArray(toeicPart6Res?.data) ? toeicPart6Res.data : [];
          
          const part6QuestionIds: number[] = [];
          toeicPart6Data.forEach((part6 : ToeicPart6) => {
            if (part6.questions?.length) {
              part6QuestionIds.push(...part6.questions);
            }
          });
          
          const questionOffset = questionNumber - 131;
          let currentQuestionCount = 0;
          
          for (let i = 0; i < toeicPart6Data.length; i++) {
            const groupQuestions = toeicPart6Data[i].questions?.length || 0;
            if (questionOffset < currentQuestionCount + groupQuestions) {
              targetIndex = i;
              break;
            }
            currentQuestionCount += groupQuestions;
          }
        } else {
          targetIndex = Math.floor((questionNumber - 131) / 4); // Fallback approximation
        }
      } catch (error) {
        console.error("Error calculating Part 6 navigation:", error);
        targetIndex = Math.floor((questionNumber - 131) / 4);
      }
    } else if (questionNumber >= 147 && questionNumber <= 200) {
      // Part 7 - calculate based on actual passage structure
      targetStep = 9;
      try {
        if (toeic?.questionsPart7?.length) {
          const toeicPart7Res = await toeicPart7Service.getByIdsAndStatus(toeic.questionsPart7, true);
          const toeicPart7Data = Array.isArray(toeicPart7Res?.data) ? toeicPart7Res.data : [];
          
          const part7QuestionIds: number[] = [];
          toeicPart7Data.forEach((part7 : ToeicPart6) => {
            if (part7.questions?.length) {
              part7QuestionIds.push(...part7.questions);
            }
          });
          
          const questionOffset = questionNumber - 147;
          let currentQuestionCount = 0;
          
          for (let i = 0; i < toeicPart7Data.length; i++) {
            const groupQuestions = toeicPart7Data[i].questions?.length || 0;
            if (questionOffset < currentQuestionCount + groupQuestions) {
              targetIndex = i;
              break;
            }
            currentQuestionCount += groupQuestions;
          }
        } else {
          targetIndex = Math.floor((questionNumber - 147) / 5); // Fallback approximation
        }
      } catch (error) {
        console.error("Error calculating Part 7 navigation:", error);
        targetIndex = Math.floor((questionNumber - 147) / 5);
      }
    }

    setStep(targetStep);
    setCurrentIndex(targetIndex);
  };

  const isLastQuestion = () => {
    return step === 9 && currentIndex === getTotalCurrentPartItems() - 1;
  };

  const renderStep = () => {
    if (!toeic || !submitToeic) {
      return <Typography>Loading...</Typography>;
    }

    switch (step) {
      case 0:
        return <VolumeTestStep />;
      case 1:
        return <DirectionsStep />;
      case 2:
        return <ListeningPart1Step />;
      case 3:
        return (
          <ListeningPart1List
            questionsPart1={toeic.questionsPart1 ?? []}
            startIndex={1}
            onFinish={() => setStep(4)}
            submitToeicId={submitToeic.id}
            initialIndex={currentIndex}
            volume={volume / 100}
            manualControl={true}
            onIndexChange={setCurrentIndex}
          />
        );
      case 4:
        return (
          <ListeningPart2List
            questionsPart2={toeic.questionsPart2 ?? []}
            startIndex={7}
            onFinish={() => setStep(5)}
            submitToeicId={submitToeic.id}
            initialIndex={currentIndex}
            volume={volume / 100}
            manualControl={true}
            onIndexChange={setCurrentIndex}
          />
        );
      case 5:
        return (
          <ListeningPart3And4List
            questions={toeic.questionsPart3 ?? []}
            startIndex={32}
            onFinish={() => setStep(6)}
            submitToeicId={submitToeic.id}
            initialIndex={currentIndex}
            volume={volume / 100}
            manualControl={true}
            onIndexChange={setCurrentIndex}
          />
        );
      case 6:
        return (
          <ListeningPart3And4List
            questions={toeic.questionsPart4 ?? []}
            startIndex={71}
            onFinish={() => setStep(7)}
            submitToeicId={submitToeic.id}
            initialIndex={currentIndex}
            volume={volume / 100}
            manualControl={true}
            onIndexChange={setCurrentIndex}
          />
        );
      case 7:
        return (
          <Part5List
            questionsPart5={toeic.questionsPart5 ?? []}
            startIndex={101}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onFinish={() => setStep(8)}
            submitToeicId={submitToeic.id}
          />
        );
      case 8:
        return (
          <Part6List
            questionsPart6={toeic.questionsPart6 ?? []}
            startIndex={131}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onFinish={() => setStep(9)}
            submitToeicId={submitToeic.id}
          />
        );
      case 9:
        return (
          <Part7List
            questionsPart7={toeic.questionsPart7 ?? []}
            startIndex={147}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onFinish={() => {}}
            submitToeicId={submitToeic.id}
          />
        );
      default:
        return <Typography>Coming soon...</Typography>;
    }
  };

  const isReadingSection = [7, 8, 9].includes(step);
  const isListeningSection = [0,1,2,3, 4, 5, 6].includes(step);
  const showSubmitButton = step >= 3;
  const showNavigationButtons = step >= 3; // Show navigation for all test parts

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error || !toeic || !submitToeic) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">{error || "Failed to load test"}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: `0 8px 32px ${alpha(
          isDarkMode ? color.black : color.gray900,
          0.1
        )}`,
        overflow: "hidden",
        bgcolor: isDarkMode ? color.gray900 : color.white,
      }}
    >
      <Box
        sx={{
          bgcolor: color.teal500,
          color: color.white,
          px: { xs: 2, md: 3 },
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          TOEIC
        </Typography>

        {getSectionTitle() && (
          <Typography variant="h6" fontWeight={600}>
            {getSectionTitle()}
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isReadingSection && countdown !== null && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TimerIcon />
              <Typography fontWeight={600} fontSize="1rem">
                {formatTime(countdown)}
              </Typography>
            </Box>
          )}

          {isListeningSection && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VolumeUpIcon sx={{ fontSize: 20 }} />
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                sx={{
                  width: 80,
                  color: color.white,
                  "& .MuiSlider-thumb": {
                    width: 12,
                    height: 12,
                  },
                  "& .MuiSlider-track": {
                    height: 3,
                  },
                  "& .MuiSlider-rail": {
                    height: 3,
                    opacity: 0.5,
                  },
                }}
              />
            </Box>
          )}
        {step >= 3 && (
        <QuestionNavigator
          currentStep={step}
          currentIndex={currentIndex}
          answeredQuestions={answeredQuestions}
          onNavigateToQuestion={handleNavigateToQuestion}
        />
      )}
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, md: 4 },
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          overflowY: "auto",
          minHeight: 0,
        }}
      >
        <Fade in key={step}>
          <Box
            sx={{
              width: "100%",
              mx: "auto",
            }}
          >
            {renderStep()}
          </Box>
        </Fade>
      </Box>

      <Box
        sx={{
          bgcolor: isDarkMode ? color.gray800 : color.white,
          px: { xs: 2, md: 4 },
          py: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          gap: 2,
          flexShrink: 0,
        }}
      >
        <Button
          variant="contained"
          onClick={prevQuestion}
          disabled={!canGoPrevious()}
          sx={{
            px: 3,
            py: 1.2,
            bgcolor: color.gray600,
            color: color.white,
            fontWeight: 600,
            textTransform: "uppercase",
            borderRadius: 1,
            minWidth: 100,
            visibility: showNavigationButtons ? "visible" : "hidden",
            "&:hover": {
              bgcolor: color.gray700,
            },
            "&:disabled": {
              bgcolor: isDarkMode ? color.gray700 : color.gray300,
              color: isDarkMode ? color.gray500 : color.gray400,
            },
          }}
        >
          Back
        </Button>

        <Box sx={{ display: "flex", gap: 2 }}>
          {showSubmitButton && (
            <Button
              variant="contained"
              onClick={handleSubmitClick}
              sx={{
                px: 3,
                py: 1.2,
                bgcolor: color.green600,
                color: color.white,
                fontWeight: 600,
                textTransform: "uppercase",
                borderRadius: 1,
                minWidth: 100,
                boxShadow: 2,
                "&:hover": {
                  bgcolor: color.green700,
                  boxShadow: 3,
                },
              }}
            >
              Submit
            </Button>
          )}

          <Button
            variant="contained"
            onClick={() => {
              if (showNavigationButtons) {
                nextQuestion();
              } else {
                setStep((prev) => prev + 1);
              }
            }}
            disabled={!canGoNext()}
            sx={{
              px: 3,
              py: 1.2,
              bgcolor: color.emerald500,
              color: color.white,
              fontWeight: 600,
              textTransform: "uppercase",
              borderRadius: 1,
              minWidth: 100,
              boxShadow: 2,
              display: isLastQuestion() ? "none" : "block",
              "&:hover": {
                bgcolor: color.emerald600,
                boxShadow: 3,
              },
              "&:disabled": {
                bgcolor: isDarkMode ? color.gray700 : color.gray300,
                color: isDarkMode ? color.gray500 : color.gray400,
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>

      


      {showResumeDialog && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: alpha(color.black, 0.5),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              bgcolor: isDarkMode ? color.gray800 : color.white,
              borderRadius: 2,
              p: 4,
              maxWidth: 400,
              mx: 2,
              textAlign: "center",
              boxShadow: 8,
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Continue Previous Test?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              You have an unfinished test. Would you like to continue from where you left off?
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="outlined"
                onClick={() => handleResumeChoice(false)}
                disabled={isResetting}
                sx={{
                  px: 3,
                  py: 1,
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                  color: isDarkMode ? color.gray300 : color.gray700,
                  "&:hover": {
                    borderColor: isDarkMode ? color.gray500 : color.gray400,
                    bgcolor: isDarkMode ? color.gray700 : color.gray50,
                  },
                  "&:disabled": {
                    opacity: 0.6,
                  },
                }}
              >
                {isResetting ? "Resetting..." : "Start Over"}
              </Button>
              <Button
                variant="contained"
                onClick={() => handleResumeChoice(true)}
                disabled={isResetting}
                sx={{
                  px: 3,
                  py: 1,
                  bgcolor: color.teal500,
                  "&:hover": {
                    bgcolor: color.teal600,
                  },
                  "&:disabled": {
                    opacity: 0.6,
                  },
                }}
              >
                Continue
              </Button>
            </Box>
            
            {isResetting && (
              <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  Clearing previous answers...
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}

      <ConfirmSubmitDialog
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleSubmitTest}
        totalQuestions={200}
        answeredQuestions={totalAnswered}
        isSubmitting={isSubmitting}
      />

      <ToeicSubmitTestDialog
        open={isSubmitDialogOpen}
        onClose={closeSubmitDialog}
        isLoading={isSubmitting}
        result={submissionResult}
        submitTestId={submitToeic?.id || 0}
      />
    </Box>
  );
};

export default ToeicTest;